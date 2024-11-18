const jwt = require('jsonwebtoken');


const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
}


// Function to verify a token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Return the decoded payload
    } catch (error) {
        // Handle errors appropriately
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        } else {
            throw new Error('Failed to verify token');
        }
    }
};


module.exports = {
    generateToken, verifyToken
}