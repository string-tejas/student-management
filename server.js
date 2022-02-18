const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routers
const userRouter = require('./routes/user')
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
