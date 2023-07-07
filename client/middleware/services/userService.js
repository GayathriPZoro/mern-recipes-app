import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import UserModel from "../models/Users";
import dbConnect from '../dbConnect'

export const login = async({username, password}) => {
    try {
        await dbConnect()
        const user = await UserModel.findOne({username});
        if (!user) {
            return {message: "User does not exist!"}
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return {message: "Username or Password Is Incorrect!"}
        }
        const token = jwt.sign({id: user._id}, process.env.PRIVATE_SECRET_KEY)
        return {token, userID: user._id, username: user.username}
    }catch(e) {
        return {message: e.message}
    }
}

export const register = async(payload) => {
    const {username, password, email} = payload;
    try {
        await dbConnect()
        const user = await UserModel.findOne({username});
        if (user) {
            return {message: "User already exists"}
        }
        const hashPwd = await bcrypt.hash(password, 10)
        const newUser = new UserModel({username, password: hashPwd, email})
        await newUser.save()
        return {message: "User Registered Successfully"}
    }catch(e) {
        return {message: e.message}
    }
}

//update password for the given user
export const passwordChange = async({password, userID}) => {
    try {
        await dbConnect()
        const user = await UserModel.findOne({_id: userID});
        if (!user) {
            return {message: "User does not exist!"}
        }
        const hashPwd = await bcrypt.hash(password, 10)
        const updatedUser = await user.updateOne({_id: userID},{$set:{password: hashPwd}})
        await updatedUser.save()
        return {message: "User Password Updated Successfully"}
    }catch(e) {
        return {message: e.message}
    }
}