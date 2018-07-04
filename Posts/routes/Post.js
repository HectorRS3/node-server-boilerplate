const express = require('express');
const router = express.Router();
const postController = require('../controllers/Post');

router.get("/", function(req, res){ postController.getAllPosts(req, res)})
.post("/post", function(req, res){ postController.createNewPost(req, res) });

module.exports = router;