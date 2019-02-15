const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

//@route POST admin/signup
//@desc Create new administrator
//@access Public
router.post('/signup', adminController.admin_signup);

//@route POST admin/signin
//@desc Administrator authentication
//@access Public
router.post('/signin', adminController.admin_signin);

module.exports = router;