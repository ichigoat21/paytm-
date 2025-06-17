import mongoose from "mongoose"
import { Schema } from "mongoose";
import { number } from "zod";



mongoose.connect("mongodb+srv://shivresides:TjLuNHyDlELlttOM@second-brain.4jq3gmh.mongodb.net/paytm").then(()=>{console.log("db connected")});


const userSchema = new Schema({
    username : {type : String, unique : true},
    password : String,
    firstName : String,
    lastName : String
})
const accountSchema = new Schema({
    userId : {
        amount : mongoose.Types.ObjectId,
        ref : "usersTables",
        required : true
    },
    balance : {
        type : Number,
        required : true
    }

})
const accountModel = mongoose.model("accountTable", accountSchema)
const userModel = mongoose.model("usersTables", userSchema);

const models = {
    accountModel,
    userModel
}

export default models