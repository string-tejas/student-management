const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        immutable: true,
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('stud-manage-user', user)
