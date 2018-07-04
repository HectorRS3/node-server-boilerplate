const Post = require("../models/Post");

const getAllPosts = (req, res) => {
    const posts = Post.find({}, function(err, allPosts){
        if(err){
            res.status(500).send({
                message: "Unable to fetch posts."
            });
        }

        if(allPosts.length <= 0){
            res.status(404).send({
                message: "No posts available right now."
            });
        }

        res.status(200).send(allPosts);
    });
};

const createNewPost = (req, res) => {
    const {username, comment} = req.body;

    const newPost = new Post({
        username: username,
        comment: comment
    });

    newPost.save(function(err, newPost){
        if(err) {
            res.status(500).send({
                message: "Couldn't post comment. Please try again later."
            });
        }

        res.status(200).send({
            message: "Comment posted successfully!"
        });
    });
}

module.exports = {
    getAllPosts,
    createNewPost
}