const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utility/wrapAsync");
const { verifyOtp } = require('../controllers/verifyOtp');

router.post('/verifyEmail', wrapAsync(verifyOtp));

module.exports = router;