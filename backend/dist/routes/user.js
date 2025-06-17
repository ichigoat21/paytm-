"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const zod_1 = __importDefault(require("zod"));
const userRouter = express_1.default.Router();
const { userModel, accountModel } = server_1.default;
const User = zod_1.default.object({
    username: zod_1.default.string().max(8),
    password: zod_1.default.string().min(6)
});
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = User.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
        return;
    }
    const existingUser = yield userModel.findOne({
        username: req.body.username
    });
    if (existingUser) {
        res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        });
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    const user = yield userModel.create({
        username,
        password
    });
    const userId = user._id;
    yield accountModel.create({
        userId,
        balance: 1 + Math.random() * 10000
    });
    const token = jsonwebtoken_1.default.sign({
        userId
    }, config_1.JWT_SECRET);
    res.json({
        message: "You are signed up",
        token
    });
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield userModel.findOne({
        username: username,
        password: password
    });
    const userId = user === null || user === void 0 ? void 0 : user._id;
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            userId
        }, config_1.JWT_SECRET);
        res.json({
            message: "You are signed in",
            token
        });
    }
    else {
        res.status(403).json({
            message: "invalid credentials"
        });
    }
}));
userRouter.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = req.body;
    const { id } = req.params;
    try {
        const result = yield userModel.findByIdAndUpdate(id, updated);
        res.json({
            message: "You are updated"
        });
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error) {
            res.status(400).json({ message: error.message });
        }
        return;
    }
}));
exports.default = userRouter;
