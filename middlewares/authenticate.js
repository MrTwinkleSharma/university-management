const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/common.js');

const isAuthenticated = (req, res, next) => {
    // Get token from request headers
    let token = req.headers.authorization;
    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    token = token.split(" ")[1]
    console.log("token %j", token);

    // Verify and decode token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        // Add decoded emailID and id to request object
        req.emailID = decoded.emailID;

        // Call next middleware
        next();
    });
};

module.exports = isAuthenticated;
