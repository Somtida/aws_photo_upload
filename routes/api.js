'use strict';

const express = require('express');

let router = express.Router();

router.use('/users', require('./users'));
router.use('/files', require('./files'));


module.exports = router;
