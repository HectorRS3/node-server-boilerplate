const express = require('express');
const router = express.Router();
const registerController = require('../controllers/Register');

router.post('/register', function(req, res){ registerController.registerUser(req, res) });

module.exports = router;