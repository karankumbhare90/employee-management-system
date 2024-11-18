const express = require('express');
const multer = require('multer');
const {
  getAllEmployees,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
} = require('../controller/employeeController2.js');

const auth = require('../middleware/auth.js');

const upload = multer({ dest: 'upload/' })

const router = express.Router();

// Employee routes
router.get('/get-all-employee', auth, getAllEmployees);
router.get('/search', searchEmployee);
router.get('/:id', auth, getSingleEmployee);
router.post('/create', auth, upload.single('profile'), createEmployee); // Cloudinary upload
router.put('/update/:id', auth, upload.single('profile'), updateEmployee); // Cloudinary upload
router.delete('/delete/:id', auth, deleteEmployee);

module.exports = router;
