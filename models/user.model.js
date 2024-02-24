const mongoose = require('mongoose');
const userObject = {
    username: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required: true
    }
}
const userSchema = mongoose.Schema(userObject, {
    timestamps: true,
})
const UserModel = mongoose.model('User', userSchema)


// blacklist here 

const blacklistSchema = mongoose.Schema({
    token: { type: String }
})
const BlacklistModel = mongoose.model('Blacklist', blacklistSchema)

module.exports = { UserModel, BlacklistModel }
