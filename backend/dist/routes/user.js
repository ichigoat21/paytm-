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
const userRouter = express_1.default.Router();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    yield server_1.default.create({
        username,
        password
    });
    res.json({
        message: "You are signed up"
    });
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield server_1.default.findOne({
        username: username,
        password: password
    });
    console.log(user);
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id
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
        const result = yield server_1.default.findByIdAndUpdate(id, updated);
        res.send(result);
    }
    catch (error) {
        //@ts-ignore
        res.status(400).json({ message: error.message });
    }
}));
exports.default = userRouter;
