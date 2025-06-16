import express from 'express';
import userRouter from './routes/user';
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", userRouter)

app.listen(3000, ()=> {console.log("server started")})
