import express from "express"
import models from "../server";
import { CustomRequest } from "../middleware";
import mongoose from "mongoose";

const accountRouter = express.Router();

const {accountModel} = models
accountRouter.get("/balance", async (req , res )=> {
    const user = await accountModel.findOne({
        userId : (req as CustomRequest).userId
    })

    res.status(200).json({
        balance : user?.balance
    })

})

accountRouter.post("/transfer", async(req, res)=> {
    const session = await mongoose.startSession();

    session.startTransaction();

    const account = req.body.account;
    const amount = req.body.amount

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        });
        return;
    }
    const toAccount = await accountModel.findOne({ userId: account }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
         res.status(400).json({
            message: "Invalid account"
        });
        return
    }
    
    await accountModel.updateOne({userId : (req as CustomRequest).userId}, {$inc : {balance : -amount}}).session(session)
    await accountModel.updateOne({userId : account}, {$inc : {balance : amount}}).session(session)

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});




export default accountRouter