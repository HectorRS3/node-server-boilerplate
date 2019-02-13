const mongoose = require('mongoose');

const User = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    createdAt: {type: Date, default: Date.now()}
});

module.exports = User;