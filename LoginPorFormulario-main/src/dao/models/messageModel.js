import mongoose from "mongoose";

const messageCollection = 'message'

const messageSchema = new mongoose.Schema({
    user:{
            type: String,
        },
        message: {
            type: String,
        }
    })

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel