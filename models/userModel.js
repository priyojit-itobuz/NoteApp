import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    token : {
        type : String
    }
})

export default mongoose.model("user",userModel)