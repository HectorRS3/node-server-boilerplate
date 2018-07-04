const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = function (req, res) {
  const {
    firstName, 
    lastName, 
    username, 
    password 
  } = req.body;

  bcrypt.hash(password, 10)
  .then(hashedPassword => {

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword
    });

    newUser.save(function(err, newUser) {
      if(err) return err;
      res.status(200).send({ message: "User created successfully!" });
    });
  })
  .catch(err => res.status(500).send({ 
    message: "Couldn't create user at the moment. Please try again later."
  }));
}

module.exports = {registerUser};