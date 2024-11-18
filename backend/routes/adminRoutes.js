const { loginAdmin, registerAdmin } = require('../controller/adminController.js');

const express = require('express');
const router = express.Router();

// Register the admin first
router.post('/register', registerAdmin);

// Login Admin
router.post('/login', loginAdmin);

module.exports = router;