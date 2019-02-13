const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = function (req, res) {
    const {username, password} = req.body;
    const user = {username, password};

    User.findOne({username: username}, 'password')
        .then(person => {
            bcrypt.compare(password, person.password, function(err, pass){

                if(pass === false) {
                    res.status(404).send({message: "Incorrect Username or Password!"}) // password did not match.
                } else {
                    const token = jwt.sign({username, password, iat: Date.now()}, process.env.SECRET, {algorithm: 'HS256'}); // Generates token when successfully signed in.
                    res.status(200).send({
                        message: "Logged in successfully!",
                        token: token
                    });
                }
            });
        })
        .catch(err => {
            // Did not find username.
            res.status(404).send({
                message: "Incorrect Username or Password"
            });
        });
};

const register = function (req, res) {
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
};

module.exports = {
    login,
    register
};