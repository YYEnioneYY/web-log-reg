import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

// Const
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.uayoazl.mongodb.net/${DB_NAME}`,
        )
        
        app.listen(PORT, () => console.log(`Server Started http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()
