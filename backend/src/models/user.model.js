const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// hash password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next()

    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword;
    next()
})

// compare password when user try to login
userSchema.methods.comparePassword = function(givenPassword) {
    return bcrypt.compare(givenPassword, this.password)
}

const User = model("User", userSchema)
module.exports = User