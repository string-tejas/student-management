const express = require('express')
const User = require('../models/modelUser')
const router = express.Router()
const bcrypt = require('bcrypt')
const { checkNotAuthenticated, checkAuthenticated } = require('../middlewares')
var passport

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

// Login user
// router.post('/login', checkNotAuthenticated, (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             console.log(err.message)
//             res.json({ ok: false, message: 'error' })
//         } else if (!user) {
//             res.json({ ok: false, ...info })
//         } else {
//             req.logIn(user, err => {
//                 if (err) res.json({ ok: false, message: 'error' })
//                 else res.json({ ok: true, ...info })
//             })
//         }
//     })(req, res, next)
// })
router.post(
    '/login',
    checkNotAuthenticated,
    passport.authenticate('local', {
        successRedirect: '/',
    })
)

// logout user
router.delete('/login', checkAuthenticated, (req, res) => {
    req.logOut()
    res.json({ ok: true, message: 'User Logged out' })
})

// get current user
router.get('/', checkAuthenticated, (req, res) => {
    res.json({ ok: true, name: req.user.name, email: req.user.email })
})

module.exports = function (initializedPassport) {
    passport = initializedPassport
    return router
}
