const express = require('express');
const router = express.Router({ mergeParams: true });
const { sendOtp } = require('../controllers/sendOtp');
const wrapAsync = require("../utility/wrapAsync");

router.get('/VerifyOtp', wrapAsync(sendOtp));

module.exports = router;
