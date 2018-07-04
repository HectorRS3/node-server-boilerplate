const express = require('express');
const router = express.Router();
const loginController = require('../controllers/Login');

router.post('/login', function(req, res){ loginController.login(req, res) });

module.exports = router;