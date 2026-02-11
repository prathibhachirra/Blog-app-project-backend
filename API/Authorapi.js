import exp from 'express';
import { ArticleModel } from "../models/ArticleModel.js"
import { register, authenticate } from '../services/authservice.js'
import { UserTypeModel } from '../models/UserModel.js'
import checkAuthor from '../middleware/checkAuthor.js';

export const authorRoute = exp.Router();

//register author(public)
authorRoute.post('/users', async (req, res) => {
    let userObj = req.body;
    const newUserObj = await register({ ...userObj, role: "AUTHOR" })
    res.status(200).json({ message: "user created", payload: newUserObj })
})


//create article(protected)
authorRoute.post('/articles', async (req, res) => {
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
authorRoute.get("/articles/:authorId", checkAuthor, async (req, res) => {

    let AuthorId = req.params.authorId

    let Articles = await ArticleModel.find({
        author: AuthorId,
        isArticleActive: true
    }).populate("author", "firstName email");

    res.status(200).json({ message: "all the articles", payload: Articles })
})


//update
authorRoute.put('/article/:Id', checkAuthor, async (req, res) => {

    let articleId = req.params.Id
    let { title, category, content } = req.body

    let articleOfDB = await ArticleModel.findById(articleId)

    if (!articleOfDB) {
        return res.status(401).json({ message: "id not found" })
    }

    let modifiedArticle = await ArticleModel.findByIdAndUpdate(
        articleId,
        { title, category, content },
        { new: true }
    )

    res.status(201).json({ message: " updated successfully", payload: modifiedArticle })
})


//soft delete
authorRoute.delete('/article/:id', async (req, res) => {

    let articleId = req.params.id

    let deleteArticle = await ArticleModel.findById(articleId)

    if (!deleteArticle) {
        return res.status(401).json({ message: "not found " })
    }

    let updatedArticle = await ArticleModel.findByIdAndUpdate(
        articleId,
        { $set: { isArticleActive: false } },
        { new: true }
    )

    res.status(201).json({ message: "updarted ", payload: updatedArticle })
})
