const mongoose = require("mongoose");

const Post = mongoose.Schema({
    username: String,
    comment: String,
    createAt: {type: Date, default: Date.now()}
});

module.exports = Post;