import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'

import { connectDB } from './config/db'
import UsersRoutes from './routes/usersRoutes'
import passportConfig from './config/passport'


dotenv.config()
connectDB()

const app = express()

// Config sesiones
app.use(session({
    secret: process.env.SESSION_KEY!,
    resave: false,
    saveUninitialized: false,
}));

// Config Passport
app.use(passportConfig.initialize());
app.use(passportConfig.session());

//Routes

app.use('/api', UsersRoutes)

export default app