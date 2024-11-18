const fs = require('fs');
const { cloudinary } = require('../config/cloudinary.js');
const Employee = require('../models/Employee.js');

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json({
            success: true,
            message: 'All Employee Details',
            data: employees
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Get a single employee by ID
const getSingleEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: `${employee.name}'s data fetched successfully`,
            data: employee
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Create a new employee
const createEmployee = async (req, res) => {
    try {
        const { email, mobileno } = req.body;
        const profile = req.file || req.file.path;

        // Check if email already exists
        const existingEmployee = await Employee.findOne({
            $or: [{ email }, { mobileno }],
        });

        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: 'Employee with this email already exists'
            });
        }

        // upload profile in cloudinary
        const uploadProfile = cloudinary.uploader.upload(profile, {
            folder: 'employee-profiles'
        })

        // Create a new employee
        const newEmployee = await Employee.create({
            ...req.body,
            profile: uploadProfile,
        });

        fs.unlinkSync(profile);

        return res.status(201).json({
            success: true,
            message: `${newEmployee.name} has been created successfully!`,
            data: newEmployee
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Update an employee
const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return the updated document with validation
        );

        if (!updatedEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: `${updatedEmployee.name} has been updated successfully!`,
            data: updatedEmployee
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

        if (!deletedEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: `${deletedEmployee.name} has been deleted successfully!`
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Exporting all controllers
module.exports = {
    getAllEmployees,
    getSingleEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
