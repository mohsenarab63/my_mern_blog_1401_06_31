import mongoose from "mongoose";
//var fileId = mongoose.Types.ObjectId();
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    userId: mongoose.Schema.Types.ObjectId ,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const postMessage = mongoose.model('postMessage',postSchema)

export default postMessage