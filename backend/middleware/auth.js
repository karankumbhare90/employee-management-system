const { verifyToken } = require('../helpers/jwt');

const auth = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        // If token is not present, throw an error
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        // Verify the token
        const decoded = verifyToken(token, process.env.JWT_SECRET);

        // Attach the user's ID to the request object for downstream handlers
        req.userId = decoded.userId;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);

        // Respond with appropriate error messages
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired. Please log in again.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token. Please log in again.' });
        }

        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = auth;