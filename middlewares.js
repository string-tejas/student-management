const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()

    res.json({ ok: false, message: 'Not Logged in' })
}

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return res.json({ ok: true, message: 'Already logged in' })

    next()
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
}
