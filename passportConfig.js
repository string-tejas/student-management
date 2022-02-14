const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/modelUser')

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email: email })
        if (user === null) {
            return done(null, false, {
                message: 'No user found',
                email: false,
                password: true,
            })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {
                    message: 'Password Incorrect',
                    email: true,
                    password: false,
                })
            }
        } catch (err) {
            return done(err)
        }
    }

    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            authenticateUser
        )
    )
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        return done(null, user)
    })
}

module.exports = initialize
