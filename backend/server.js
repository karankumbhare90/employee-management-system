require('dotenv').config();
const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes.js');
const employeeRoutes = require('./routes/employeesRoutes.js');
const connectDB = require('./config/connectDB.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);

app.get('/', (req, res) => {
  return res.status(201).json({
    success: true,
    message: "Server is running !!"
  })
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});