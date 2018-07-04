const express = require('express');
const router = express.Router();

const loginRoute = require('./routes/Login')
const registerRoute = require('./routes/Register');

router.use(loginRoute);
router.use(registerRoute);

module.exports = router;