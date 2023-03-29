import { Server } from 'socket.io'
import express from 'express'
import __dirname from './utils.js'
import chatRouter from './routes/web/chat.router.js'
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import viewsRouter from './routes/web/views.router.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import Chats from './dao/dbManagers/chat.js'
import messageModel from './dao/models/messageModel.js'

const chatManager = new Chats()

const app = express()
app.use(express.static(`${__dirname}/public`))

//config de nuestras vistas
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use('/chat', chatRouter)
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


try {
    await mongoose.connect('mongodb+srv://lautaronarizzano:QZoTw0N0bZ1xU1Te@codercluster.2kusi8q.mongodb.net/?retryWrites=true&w=majority')
} catch (error) {
    console.log(error)
}

const server = app.listen(8080, () => console.log('Server running on port 8080'))

const io = new Server(server)

// const messages = await chatManager.getMessages()
const messages = []

io.on('connection', socket => {
    socket.on('message', async data => {
        // messages.push(data)
            await messageModel.create(data)
            try {
            await chatManager.addMessage(data)
            const messages = await chatManager.getMessages().toObject()
            console.log(messages)
            io.emit('messageLogs', messages)
            } catch (error) {
                console.log(error)
            }
            
    })
})