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
                const token = jwt.sign({username, password, iat: Date.now()}, 'secret', {algorithm: 'HS256'}); // Generates token when successfully signed in.
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
}

module.exports = {login};