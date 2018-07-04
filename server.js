// Server dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Connection
const connection = require('./connection');

// Routes
const userRoutes = require('./Accounts/Index');
const postRoute = require('./Posts/Index');

// Initiate connection with MongoDB.
app.use(connection, function(){
    // This is a middleware function that does nothing.
    // This is required in order to use the connection module.
});

app.use(cors()); // CORS

// Body parser for methods that sends body in their requests.
app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true})); // application/x-www-form-urlencoded

// Route list
app.use('/user', userRoutes);
app.use('/posts', postRoute);

app.listen(8080, function(req, res){
    console.log("Listening on http://localhost:8080...");
});
