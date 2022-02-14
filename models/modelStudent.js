const mongoose = require('mongoose')

const student = new mongoose.Schema(
    {
        name: String,
        school: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'stud-manage-school',
        },
        roll: Number,
        class: Number,
        dateOfBirth: String,
        division: String,
        isActive: Boolean,
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
)

student.virtual('age').get(function () {
    let dob = new Date(this.dateOfBirth)
    let differenceMs = Date.now() - dob
    let agePlus1970 = new Date(differenceMs)
    return Math.abs(agePlus1970.getFullYear() - 1970)
})

module.exports = mongoose.model('stud-manage-student', student)
