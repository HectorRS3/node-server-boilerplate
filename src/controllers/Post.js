const Post = require("../models/Post");

const getAllPosts = (req, res) => {
  Post.find({})
      .then(allPosts => {
        res.status(200).send(allPosts);
      })
      .catch(err => {
        res.status(500).send({ message: "Something wrong happened. Please try again.", error: err });
      });
};

const getPost = (res, req, id) => {
  Post.findOne({id: id})
      .then(post => {
        res.status(200).send(post);
      })
      .catch(err => {
        res.status(500).send({ message: "Something wrong happened. Please try again.", error: err });
      });
};

const createNewPost = (req, res, post) => {
  const newPost = new Post(post);

  newPost.save()
      .then(post => {
        res.status(201).send({ message: "Post created successfully", post: post._id });
      })
      .catch(err => {
        res.status(500).send({ message: "Something wrong happened. Please try again.", error: err });
      });
};

const updatePost = (req, res, id, comment) => {
  Post.findOneAndUpdate({id: id})
      .then(post => {
        post.comment = comment;
        post.save();
        res.status(200).send({ message: "Post has been updated successfully!", post: post._id});
      })
      .catch(err => {
        res.status(500).send({ message: "Something wrong happened. Please try again.", error: err });
      });
};

const deletePost = (req, res, id) => {
  Post.findOneAndRemove({ id: id })
      .then(post => {
        res.status(200).send({ message: "Post has been removed successfully!", post: post._id });
      })
      .catch(err => {
        res.status(500).send({ message: "Something wrong happened. Please try again.", error: err });
      });
};

module.exports = {
  getAllPosts,
  getPost,
  createNewPost,
  updatePost,
  deletePost
};
