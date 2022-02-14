const router = require('express').Router()
const { checkAuthenticated } = require('../middlewares')
const School = require('../models/modelSchool')

router.post('/register', checkAuthenticated, async (req, res) => {
    try {
        const school = await School.create({
            name: req.body.name,
            address: req.body.address,
        })
        if (school) {
            res.json({ ok: true, message: 'School Added' })
        } else {
            res.json({ ok: false, message: 'School Not Added' })
        }
    } catch (err) {
        if (err.code === 11000) {
            res.json({ ok: false, message: 'School Already Registered' })
        } else {
            console.log(err.message)
            res.json({ ok: false, message: 'error' })
        }
    }
})

router.get('/:option', checkAuthenticated, async (req, res) => {
    try {
        console.log('school get name')
        if (req.params.option === 'name') {
            const allSchools = await School.find({}, { name: 1 })
            res.json(allSchools)
        } else {
            res.json({ ok: false, message: 'Wrong option' })
        }
    } catch (err) {
        console.log(err.message)
        res.json({ ok: false, message: 'error' })
    }
})
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        console.log('get all school')
        const allSchools = await School.find()
        res.json(allSchools)
    } catch (err) {
        console.log(err.message)
        res.json({ ok: false, message: 'error' })
    }
})

module.exports = router
