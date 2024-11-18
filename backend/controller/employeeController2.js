const fs = require('fs');
const cloudinary = require('../config/cloudinary.js');
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
        const { name, email, mobileno, designation, gender, course } = req.body;
        const profile = req.file; // Use req.file for single file upload

        if (!profile) {
            return res.status(400).json({
                success: false,
                message: 'Profile image is required',
            });
        }

        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: 'Employee with this email already exists',
            });
        }

        // Upload to Cloudinary
        const profileUpload = await cloudinary.uploader.upload(profile.path, {
            folder: 'employee-profiles',
        });

        // Remove the local file
        fs.unlinkSync(profile.path);

        // Create a new employee
        const newEmployee = await Employee.create({
            name,
            email,
            mobileno,
            designation,
            gender,
            course,
            profile: profileUpload.secure_url,
        });

        return res.status(201).json({
            success: true,
            message: `${newEmployee.name} has been created successfully!`,
            data: newEmployee,
        });
    } catch (error) {
        console.error('Error creating employee:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

// Update an employee
const updateEmployee = async (req, res) => {
    try {
        const { name, email, mobileno, designation, gender, course } = req.body;
        const profile = req.file; // Use req.file for single file upload

        // Find the employee to update
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            });
        }

        let updatedProfileUrl = employee.profile;

        // If a new profile image is uploaded
        if (profile) {
            // Upload the new profile image to Cloudinary
            const profileUpload = await cloudinary.uploader.upload(profile.path, {
                folder: 'employee-profiles',
            });

            // Remove the local file
            fs.unlinkSync(profile.path);

            // Delete the old profile image from Cloudinary if it exists
            if (employee.profile && employee.profile.includes('cloudinary.com')) {
                const publicId = employee.profile.split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            // Update the profile URL with the new one
            updatedProfileUrl = profileUpload.secure_url;
        }

        // Update the employee's data
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                mobileno,
                designation,
                gender,
                course,
                profile: updatedProfileUrl,
            },
            { new: true, runValidators: true } // Return the updated document with validation
        );

        return res.status(200).json({
            success: true,
            message: `${updatedEmployee.name}'s details have been updated successfully!`,
            data: updatedEmployee,
        });
    } catch (error) {
        console.error('Error updating employee:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
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

// Search Employee By Name
const searchEmployee = async (req, res) => {
    const { name } = req.query; // Get the search query from the request

    try {
        // Search for employees by name (case-insensitive)
        const employees = await Employee.find({
            name: { $regex: name, $options: 'i' }, // Case-insensitive search
        });
        res.json({ data: employees });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
}

// Exporting all controllers
module.exports = {
    getAllEmployees,
    getSingleEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployee
};
