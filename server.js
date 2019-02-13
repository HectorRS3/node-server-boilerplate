// Server dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;

// Connection
const connection = require('./connection');

// Routes
const userRoutes = require('./src/routes/User');
const postRoutes = require('./src/routes/Post');

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
app.use('/posts', postRoutes);

app.listen(port, function(req, res){
    console.log(`Listening on http://localhost:${port}...`);
});
