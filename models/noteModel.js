import mongoose from 'mongoose'

const noteModel = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

export default mongoose.model("note",noteModel)