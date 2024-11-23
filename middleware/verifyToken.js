const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // 'Bearer YOUR_JWT_TOKEN'
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        // Verify the token using the secret from the .env file
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user information to the request object
        req.user = decoded;
        next(); // Pass control to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' }); // Invalid token or expired
    }
};

module.exports = verifyToken;
