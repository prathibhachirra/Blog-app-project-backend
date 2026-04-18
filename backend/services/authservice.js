import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { compare } from "bcryptjs"
import { UserTypeModel } from "../models/UserModel.js"
import { config } from 'dotenv'
config()

//register function
export const register = async (userObj) => {

    //convert email to lowercase & remove spaces
    userObj.email = userObj.email.trim().toLowerCase();

    //create the document 
    const userDoc = new UserTypeModel(userObj);

    //validate fro empty passwords
    await userDoc.validate();

    //hash and replace plain password
    userDoc.password = await bcrypt.hash(userDoc.password, 10);

    try {
        //save
        const created = await userDoc.save();

        //convert document to object to remove password
        const newUserObj = created.toObject();

        //remove password
        delete newUserObj.password;

        //return user obj without password 
        return newUserObj;

    } catch (err) {

        //handle duplicate email error
        if (err.code === 11000) {
            const error = new Error("email already exists");
            error.status = 400;
            throw error;
        }

        throw err;
    }

};

//authentication function
export const authenticate = async ({ email, password }) => {

    //remove spaces and convert email
    email = email.trim().toLowerCase();

    console.log('Authenticating user:', email);

    //check user with email & role
    const user = await UserTypeModel.findOne({ email });

    if (!user) {
        console.log('User not found for email:', email);
        const err = new Error("invalid email ");
        err.status = 401;
        throw err;
    }

    console.log('User found:', user._id, 'role:', user.role, 'isActive:', user.isActive);

    //compare passwords
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        console.log('Password mismatch for user:', user._id);
        const err = new Error('invalid password');
        err.status = 401;
        throw err;
    }

    console.log('Password match, checking isActive');

    //check isActive state
    if (user.isActive === false) {
        console.log('User account not active:', user._id);
        const err = new Error('your account is blocked.plz contact admin');
        err.status = 403;
        throw err;
    }

    console.log('Generating token for user:', user._id);

    //generate token
    const token = jwt.sign(
        { UserId: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "21h",
        }
    );

    const userObj = user.toObject();

    delete userObj.password;

    return { token, user: userObj };
}
