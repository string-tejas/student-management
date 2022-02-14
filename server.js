const express = require('express')
const mongoose = require('mongoose')
const initialize = require('./passportConfig')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(
    cors({
        origin: 'https://student-management-tawny.vercel.app',
        credentials: true,
    })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 48,
        },
    })
)
initialize(passport)
app.use(passport.initialize())
app.use(passport.session())

// routers
const userRouter = require('./routes/user')(passport)
app.use('/api/user', userRouter)
const schoolRouter = require('./routes/school')
app.use('/api/school', schoolRouter)
const studentRouter = require('./routes/student')
app.use('/api/student', studentRouter)

// starting server and connection
app.listen(port, () => console.log(`Server started on port ${port}`))
mongoose.connect(process.env.DATABASE, () =>
    console.log('Connected to mongoose')
)
