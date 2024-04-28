const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Example authentication function
const authenticateUser = (email, password) => {
    return new Promise((resolve, reject) => {
        global.db.query("SELECT * FROM admin WHERE emailID = ? AND password = ?", [email, password], (err, result) => {
            if (err) {
                console.error("Error occurred:", err);
                reject(err);
            }
            if (result.length === 1) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

// Secret key for JWT token signing (replace with your own secret)
const JWT_SECRET = 'your-secret-key';

// POST /login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Authenticate user
        const isAuthenticated = await authenticateUser(email, password);

        if (isAuthenticated) {
            // If authentication succeeds, generate JWT token
            const token = jwt.sign({ email }, JWT_SECRET);

            // Send success response with token
            return res.status(200).json({ message: 'Login successful', token });
        } else {
            // If authentication fails, return an error response
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        // If an error occurs during authentication, return an error response
        console.error("Authentication error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
