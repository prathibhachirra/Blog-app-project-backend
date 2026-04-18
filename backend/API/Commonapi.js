import exp from 'express'
import { authenticate } from '../services/authservice.js';
import { UserTypeModel } from '../models/UserModel.js';
import { compare, hash } from 'bcryptjs';
import { verifyToken } from '../middleware/VerifyToken.js';


export const commonRoute = exp.Router()

//login
commonRoute.post("/login", async (req, res) => {
    try {
        let userCred = req.body;
        let { token, user } = await authenticate(userCred);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "login successful", payload: user })
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ message: "error", reason: err.message })
    }
});


//logout for user,Author and Admin
commonRoute.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,    //these all must match the original settings
        secure: false,
        sameSite: 'lax',
    });
    res.status(200).json({ message: "logout successfully" })
});

//debug route to get all users
commonRoute.get('/users', async (req, res) => {
    try {
        const users = await UserTypeModel.find({}, '-password');
        res.status(200).json({ message: "users", payload: users });
    } catch (err) {
        res.status(500).json({ message: "error", reason: err.message });
    }
});


//change passwords (protected route)
//get current password and new password
//check the current password is correct or not
//replace current password with new password(hash)
//send res
commonRoute.put('/change-passwords', async (req, res) => {

    let { userId, currentPassword, newPassword } = req.body
    //check user exists
    let user = await UserTypeModel.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }

    //check current password is correct or not
    let isMatch = await compare(currentPassword, user.password)
    if (!isMatch) {
        return res.status(401).json({ message: "current password is incorrect" })
    }

    //replace current password with new password(hash)
    let hashedPassword = await hash(newPassword, 6)
    user.password = hashedPassword
    await user.save()

    //send res
    res.status(200).json({ message: "password changed successfully" })
});

//page refresh
commonRoute.get("/check-auth", verifyToken("USER","AUTHOR","ADMIN"), (req, res) => {
  res.status(200).json({
    message: "authenticated",
    payload: req.user
  });
});