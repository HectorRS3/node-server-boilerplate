const Post = require("../models/Post");

const getAllPosts = (req, res) => {
  const posts = Post.find({}, function (err, allPosts) {
    if (err) {
      res.status(500).send({
        message: "Unable to fetch posts."
      });
    }

    if (allPosts.length <= 0) {
      res.status(404).send({
        message: "No posts available right now."
      });
    }

    res.status(200).send(allPosts);
  });
};

const createNewPost = (req, res) => {
  const { username, comment } = req.body;

  const newPost = new Post({
    username: username,
    comment: comment
  });

  newPost.save(function (err, newPost) {
    if (err) {
      res.status(500).send({
        message: "Couldn't post comment. Please try again later."
      });
    }

    res.status(200).send({
      message: "Comment posted successfully!"
    });
  });
}

const updatePost = (req, res) => {
  const { comment } = req.body;
  const { id } = req.query;

  const oldPost = Post.findOne({ id: id }, function (err, post) {

    if (err) {
      res.status(400).send({
        message: "This post doesn't exist, is just an illusion."
      });
    }

    post.comment = comment;

    post.save(function (err, post) {
      if (err) {
        res.status(500).send({
          message: "Could not update your post. Please try again later."
        });
      }

      res.status(200).send({
        message: "Post updated successfully!"
      });
    });
  });
}

const deletePost = (req, res) => {
  const { id } = req.query;

  const currentPost = Post.findOneAndRemove({ id: id }, function (err, post) {
    if (err) {
      res.status(500).send({
        message: "Something went wrong. Please try again later."
      });
    }

    res.status(200).send({
      message: "Post removed successfully!",
      id: post._id
    });

  });
}

module.exports = {
  getAllPosts,
  createNewPost,
  updatePost,
  deletePost
}
