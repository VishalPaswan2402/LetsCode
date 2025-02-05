const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utility/wrapAsync');
const { userPage } = require('../controllers/userPage');

router.get('/:username', wrapAsync(userPage));

module.exports = router;