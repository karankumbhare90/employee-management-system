const { generateToken } = require('../helpers/jwt.js');
const User = require('../models/User.js');

// Register the admin
const registerAdmin = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        const newUser = new User({
            username,
            password,
            email
        });

        await newUser.save();

        // Generate the token after saving the user
        const token = generateToken({ userId: newUser._id, email: newUser.email });

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            token: token
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Login Admin
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate the token after successful login
        const token = generateToken({ userId: user._id, email: user.email });

        return res.json({
            success: true,
            message: 'Login Successful',
            token: token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

module.exports = {
    registerAdmin, loginAdmin
};
