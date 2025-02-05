const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utility/wrapAsync');
const { changePasswordPage, updatePassword } = require('../controllers/changePassword');

router.get("/:id/NewPassword", wrapAsync(changePasswordPage))
router.put('/Change', wrapAsync(updatePassword));

module.exports = router;