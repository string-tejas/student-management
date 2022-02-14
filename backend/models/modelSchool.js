const mongoose = require('mongoose')

const school = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: String,
    totalStudents: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('stud-manage-school', school)
