import exp from 'express';
import { ArticleModel } from "../models/ArticleModel.js"
import { register, authenticate } from '../services/authservice.js'
import { UserTypeModel } from '../models/UserModel.js'
import checkAuthor from '../middleware/checkAuthor.js';
import { verifyToken } from '../middleware/VerifyToken.js';

export const authorRoute = exp.Router();

//register author(public)
authorRoute.post('/users', async (req, res) => {
    try {
        let userObj = req.body;
        const newUserObj = await register({ ...userObj, role: "AUTHOR" })
        res.status(201).json({ message: "user created", payload: newUserObj })
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ message: "error", reason: err.message })
    }
})


//create article(protected)
authorRoute.post('/articles',checkAuthor, async (req, res) => {
    let article = req.body

    let CheckAuth = await UserTypeModel.findById(article.author)

    if (!CheckAuth) {
        return res.status(401).json({ message: "not an author" })
    }

    let articleDoc = new ArticleModel(article)
    let createdArticle = await articleDoc.save()

    return res.status(201).json({ message: "article created", payload: createdArticle })
})



//read articles(protected)
authorRoute.get("/articles/:authorId",checkAuthor , async (req, res) => {

    let AuthorId = req.params.authorId

    let Articles = await ArticleModel.find({
        author: AuthorId,
        isArticleActive: true
    }).populate("author", "firstName email");

    res.status(200).json({ message: "all the articles", payload: Articles })
})



//edit article(protected route)
authorRoute.put("/articles", checkAuthor, async (req, res) => {
  //get modified article from req
  let { articleId, title, category, content, author } = req.body;
  //find article
  let articleOfDB = await ArticleModel.findOne({ _id: articleId, author: author });
  if (!articleOfDB) {
    return res.status(401).json({ message: "Article not found" });
  }



  //update the article
  let updatedArticle = await ArticleModel.findByIdAndUpdate(
    articleId,
    {
      $set: { title, category, content },
    },
    { new: true },
  );
  //send res(updated article)
  res.status(200).json({ message: "article updated", payload: updatedArticle });
});



//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", checkAuthor, async (req, res) => {
  const { id } = req.params;
  const { isArticleActive } = req.body;
  // Find article
  const article = await ArticleModel.findById(id); //.populate("author");
 
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  
  // AUTHOR can only modify their own articles
  if (req.user.role === "AUTHOR" && 
    article.author.toString() !== req.user.userId) {
    return res
    .status(403)
    .json({ message: "Forbidden. You can only modify your own articles" });
  }
  // Already in requested state
  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  //update status
  article.isArticleActive = isArticleActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    article,
  });
});