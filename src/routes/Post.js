const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const postController = require('../controllers/Post');

router.get("/", function (req, res) {
  const { token } = req.headers;

  jwt.verify(token, process.env.SECRET, function(err, verified){
    if(verified) {
      postController.getAllPosts(req, res);
    } else {
      res.status(401).send({ message: "Invalid signature" });
    }
  });
})
  .get('/post/:id', function(req, res) {
    const { token } = req.headers;
    const { id } = req.query;

    jwt.verify(token, process.env.SECRET, function (err, verified) {
      if(verified) {
        postController.getPost(req, res, id);
      } else {
        res.status(401).send({ message: "Invalid signature" });
      }
    });
  })

  .post("/post", function (req, res) {
    const { token } = req.headers;
    const { post } = req.body;

    jwt.verify(token, process.env.SECRET, function (err, verified) {
      if(verified) {
        postController.createNewPost(req, res, post);
      } else {
        res.status(401).send({ message: "Invalid signature" });
      }
    });
  })

  .put("/post/:id", function (req, res) {
    const { token } = req.headers;
    const { id } = req.query;
    const { comment } = req.body;

    jwt.verify(token, process.env.SECRET, function (err, verified) {
      if(verified) {
        postController.updatePost(req, res, id, comment);
      } else {
        res.status(401).send({ message: "Invalid signature" });
      }
    });
  })

  .delete("/post/:id", function (req, res) {
    const { token } = req.headers;
    const { id } = req.query;

    jwt.verify(token, process.env.SECRET, function(err, verified) {
      if(verified) {
        postController.deletePost(req, res, id);
      } else {
        res.status(401).send({ message: "Invalid signature" });
      }
    });
  });

module.exports = router;
