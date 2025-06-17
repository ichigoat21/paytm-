import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

export interface CustomRequest extends Request {
    userId : string
}
interface JwtPayload {
    userId: string;
}

 const authMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader ){
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
        const customReq = req as CustomRequest;
        customReq.userId = decoded.userId
        next()
    } catch (error) {
        res.status(403).json({
            //@ts-ignore
            "message" : error.message
    })}
}
export default authMiddleware