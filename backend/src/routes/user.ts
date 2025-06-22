import express from "express";
import models from "../server";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
import z from "zod"

const userRouter = express.Router();
const {userModel, accountModel} = models
const User = z.object({
    username : z.string(),
    password : z.string().min(6)
})

userRouter.post("/signup", async (req, res)=> {
    const {success} = User.safeParse(req.body);
    
    if (!success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
        return;
    }
    const existingUser = await userModel.findOne({
        username: req.body.username
    })
    if (existingUser) {
         res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
        return
    }
    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.create({
        username,
        password
    })
    const userId = user._id
    
    await accountModel.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({
        message : "You are signed up",
        token
    })
    
})

userRouter.post("/signin", async (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userModel.findOne({
        username : username,
        password : password
    })
    const userId = user?._id
    if (user) {
        const token = jwt.sign({
            userId
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
        if (error && typeof error === "object" && "message" in error){
        res.status(400).json({ message: error.message });
        }
        return;
    }

}) 

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await userModel.find({
        $or: [{
            username: {
                "$regex": filter
            }
        }]
    })

    console.log(users);

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

export default userRouter