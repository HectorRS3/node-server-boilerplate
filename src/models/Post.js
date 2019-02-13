const mongoose = require("mongoose");
const postSchema = require("../schemas/Post");

const Post = mongoose.model("Post", postSchema);

module.exports = Post;