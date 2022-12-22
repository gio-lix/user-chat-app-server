import express from "express"
import mongoose from "mongoose";
import {Server} from 'socket.io';
import {createServer} from 'http';
import cors from "cors"

import dotenv from "dotenv"

dotenv.config()

import routes from "./routes/index.js";
import SocketServer from "./socketServer.js";

const app = express()


const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: [ 'http://localhost:3000', "https://user-chat-app-frontend.onrender.com"],
        credentials: true
    }
});

app.use(express.json())
app.use(cors())

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("mongodb is connecting!")
})


app.use("/api", routes)

io.on("connection", socket => {
    SocketServer(socket)
})

server.listen(process.env.PORT, () => {
    console.log(`Server starting on port ${process.env.PORT}`)
})


