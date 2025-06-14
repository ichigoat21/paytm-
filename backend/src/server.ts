import mongoose from "mongoose"
import { Schema } from "mongoose";



mongoose.connect("mongodb+srv://shivresides:TjLuNHyDlELlttOM@second-brain.4jq3gmh.mongodb.net/paytm").then(()=>{console.log("db connected")});


const userSchema = new Schema({
    username : {type : String, unique : true},
    password : String,
    firstName : String,
    lastName : String
})

const userModel = mongoose.model("usersTables", userSchema);

export default userModel