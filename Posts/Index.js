const express = require('express');
const router = express.Router();

const postRoute = require('./routes/Post');

router.use(postRoute);

module.exports = router;