const router = require('express').Router()
const { checkAuthenticated } = require('../middlewares')
const Student = require('../models/modelStudent')
const mongoose = require('mongoose')

router.post('/register', checkAuthenticated, async (req, res) => {
    try {
        const student = await Student.create({
            _id: mongoose.Types.ObjectId(req.body.id),
            name: req.body.name,
            school: mongoose.Types.ObjectId(req.body.school),
            roll: req.body.roll,
            class: req.body.class,
            dateOfBirth: req.body.dateOfBirth,
            division: req.body.division,
            isActive: req.body.isActive,
        })
        if (student) res.json({ ok: true, message: 'Student Added' })
        else res.json({ ok: false, message: 'Student not added' })
    } catch (err) {
        if (err.code === 11000) {
            res.json({
                ok: false,
                message: 'Already Exists',
            })
        } else {
            console.log(err.message)
            res.json({ ok: false, message: 'error' })
        }
    }
})

router.post('/edit', checkAuthenticated, async (req, res) => {
    try {
        let student = await Student.findOne({ _id: req.body._id })
        student.id = req.body.id
        student._id = req.body._id
        student.name = req.body.name
        student.dateOfBirth = req.body.dateOfBirth
        student.roll = req.body.roll
        student.school = req.body.school
        student.class = req.body.class
        student.division = req.body.division
        student.isActive = req.body.isActive

        student.save(function (err) {
            if (err) {
                res.json({ ok: false, message: 'Student not updated' })
            } else {
                res.json({ ok: true, message: 'Student Updated' })
            }
        })
    } catch (err) {
        console.log(err.message)
        res.json({ ok: false, message: 'error' })
    }
})

router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const allStudents = await Student.find()
            .populate('school')
            .sort({ 'school.name': 1, class: 1, division: 1, roll: 1, name: 1 })
        res.json(allStudents)
    } catch (err) {
        console.log(err.message)
        res.json({ ok: false, message: 'error' })
    }
})

router.delete('/', checkAuthenticated, async (req, res) => {
    try {
        let result = await Student.deleteOne({ _id: req.body._id })
        console.log(result)
        res.json({ ok: true, message: 'deleted' })
    } catch (err) {
        console.log(err.message)
        res.json({ ok: false, message: 'error' })
    }
})

router.post('/search', checkAuthenticated, async (req, res) => {
    try {
        console.log('req-body-search', req.body)
        let searchExp = new RegExp(req.body.name, 'i')
        let students = await Student.find({
            name: searchExp,
            age: req.body.age,
            roll: req.body.roll,
            school: req.body.school,
            division: req.body.division,
            class: req.body.class,
        })
            .populate('school')
            .sort({ 'school.name': 1, class: 1, div: 1, roll: 1 })

        res.json(students)
    } catch (e) {
        console.log(e.message)
        res.json({ ok: false, message: 'Error occured' })
    }
})

module.exports = router
