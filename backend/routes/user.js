const express = require('express')
const User = require('../models/modelUser')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { checkNotAuthenticated, checkAuthenticated } = require('../middlewares')
// Register user
const registerUser = async (name, email, password) => {
    try {
        await User.create({ name: name, email: email, password: password })
        return { ok: true, message: `Successfully registered` }
    } catch (err) {
        if (err.code === 11000) {
            return { ok: false, message: 'Email already registered' }
        }
        console.log(err.message)
        return { ok: false, message: 'Some error occurred' }
    }
}

router.post('/register', checkNotAuthenticated, async (req, res) => {
    if ('name' in req.body && 'email' in req.body && 'password' in req.body) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        let result = await registerUser(
            req.body.name,
            req.body.email,
            hashedPassword
        )
        res.json(result)
    } else {
        res.json({ ok: false, message: 'Missing attribute' })
    }
})

// login user
router.post('/login', checkNotAuthenticated, async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                let signObj = {
                    email: user.email,
                    name: user.name,
                }
                const jwtToken = await jwt.sign(
                    signObj,
                    process.env.SESSION_KEY,
                    { expiresIn: '48h' }
                )
                res.json({ ok: true, message: 'Logged in', token: jwtToken })
            } else {
                res.json({
                    ok: false,
                    message: 'Password Incorrect',
                    email: true,
                    password: false,
                })
            }
        } else {
            res.json({
                ok: false,
                message: 'User not found',
                email: false,
                password: true,
            })
        }
    } catch (e) {
        console.log(e.message)
        res.json({ ok: false, message: 'error' })
    }
})

// logout user
router.delete('/login', checkAuthenticated, (req, res) => {
    res.json({ ok: true, message: 'User Logged out' })
})

// get current user
router.get('/', checkAuthenticated, (req, res) => {
    res.json({ ok: true, name: req.user.name, email: req.user.email })
})

module.exports = router
