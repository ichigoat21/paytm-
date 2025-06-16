import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

interface CustomRequest extends Request {
    userId : string
}

export const authMiddleware = (req : CustomRequest, res : Response, next : NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message : "Invalid"
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (typeof decoded === "string") {
            return;
        }
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(403).json({
            "message" : "you are not logged in"
    })}
}