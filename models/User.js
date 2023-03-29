const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    modifiedAt: {
        type: Date,
        default: () => Date.now()
    }
})

userSchema.pre('save', function(next) {
    this.modifiedAt = Date.now()
    next()
})


module.exports = mongoose.model("User", userSchema)
