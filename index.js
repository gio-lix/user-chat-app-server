import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"

import routers from "./routes/index.js";

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URL, () => {
    console.log("mongodb is connecting!")
})


app.use("/api", routers)



app.listen(process.env.PORT, () => {
    console.log(`Server starting on port ${process.env.PORT}`)
})

