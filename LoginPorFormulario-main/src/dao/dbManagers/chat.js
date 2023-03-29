import messageModel from '../models/messageModel.js'

export default class Message{
    constructor() {
        console.log('working messages with DB on mongoDB')
    }

    getMessages = async () => {
        const messages = await messageModel.find()
        return messages
    }
    addMessage = async (user, message) => {
        const result = await messageModel.create({user, message})
        return result
    }
}