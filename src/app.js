import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import tasksRoutes from './routes/tasks.routes.js'

const app = express()

// Settings
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

// Middlewares

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tasks', tasksRoutes)

export default app
