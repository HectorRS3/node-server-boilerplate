const express = require('express');
const router = express.Router();
const postController = require('../controllers/Post');
const jwt = require("jsonwebtoken");
const user = require("../../Accounts/models/User");
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  const { token } = req.headers;
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      res.status(401).send({ message: "You must provide a valid authentication token." });
    } else {
      user.findOne({ username: decoded.username }, 'password')
        .then(person => {
          bcrypt.compare(decoded.password, person.password, function (err, pass) {
            if (err) return err;
            if (pass === null) {
              res.status(404).send({message: "Incorrect username or password."});
            } else {
              postController.getAllPosts(req, res);
            }
          });
        })
        .catch(err => res.send.status(500).send(err));
    }
  })
})

.post("/post", function (req, res) { 
  const {token} = req.headers;
  jwt.verify(token, process.env.SECRET, function(err, decoded){
    if(err) {
      res.status(401).send({message: "You must provide a valid authentication token."});
    } else {
      user.findOne({username: decoded.username}, 'password')
      .then(person => {
        bcrypt.compare(decoded.password, person.password, function(err, pass){
          if(err) return err;
          if(pass === null) {
            res.status(401).send({message: "Incorrect username or password."})
          } else {
            postController.createNewPost(req, res);
          }
        });
      })
      .catch(err => res.send.status(500).send(err));
    }
  })
 });

module.exports = router;