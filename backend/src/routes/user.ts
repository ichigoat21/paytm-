import express from "express";
import userModel from "../server";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    await userModel.create({
        username,
        password
    })
    
    res.json({
        message : "You are signed up"
    })
})

userRouter.post("/signin", async (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userModel.findOne({
        username : username,
        password : password
    })
    console.log(user)
    if (user) {
        const token = jwt.sign({
            id : user._id
        }, JWT_SECRET)
        res.json({
            message : "You are signed in",
            token
        })
    } else {
        res.status(403).json({
            message : "invalid credentials"
        })
    }
   
})

userRouter.put("/update/:id", async (req, res) => {
    const updated = req.body;
    const {id} = req.params;

    try {
       const result =  await userModel.findByIdAndUpdate(id, updated);
       res.json({
        message : "You are updated"
       })
    } catch (error) {
        //@ts-ignore
        res.status(400).json({ message: error.message });
    }

})

export default userRouter