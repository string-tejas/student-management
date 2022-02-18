const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkAuthenticated = async (req, res, next) => {
    try {
        let authToken = req.headers['authorization']
        if (authToken) {
            authToken = authToken.split(' ')[1]
            console.log(authToken)
            const user = await jwt.verify(authToken, process.env.SESSION_KEY)
            req.user = user
            next()
        } else {
            console.log('no token found')
            res.json({ ok: false, message: 'Not logged in' })
        }
    } catch (e) {
        console.log(e.message)
        res.json({ ok: false, message: 'Not logged in' })
    }
}

const checkNotAuthenticated = async (req, res, next) => {
    try {
        let authToken = req.headers['authorization']
        if (authToken) {
            authToken = authToken.split(' ')[1]
            console.log(authToken)
            const user = await jwt.verify(authToken, process.env.SESSION_KEY)
            req.user = user
            res.json({ ok: true, message: 'Already logged in' })
        } else {
            next()
        }
    } catch (e) {
        next()
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
}
