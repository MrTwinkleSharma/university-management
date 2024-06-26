const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// Example authentication function
const authenticateUser = (emailID, password) => {
    return new Promise((resolve, reject) => {
        global.db.query("SELECT * FROM admins WHERE emailID = ? AND password = ?", [emailID, password], (err, result) => {
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

// Example authentication function
const verifyUser = (emailID) => {
    return new Promise((resolve, reject) => {
        global.db.query("SELECT * FROM admins WHERE emailID = ?", [emailID], (err, result) => {
            if (err) {
                console.error("Error occurred:", err);
                return reject(err);
            }
            if (result.length === 1) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};
 

// Example authentication function
const createUser = ({ firstName, lastName, emailID, mobileNumber, password }) => {
    return new Promise((resolve, reject) => {
        const dbObject = {
            firstName,
            lastName,
            emailID,
            mobileNumber,
            password
        }
        global.db.query("INSERT INTO admins SET ?", [dbObject], (err, result) => {
            if (err) {
                console.error("Error occurred:", err);
                return reject(err);
            }
            resolve(true);
        });
    });
};

const resetPassword = (emailID, password) => {
    return new Promise((resolve, reject) => {
        global.db.query("UPDATE admins SET password = ? WHERE emailID = ?", [password, emailID], (err, result) => {
            if (err) {
                console.error("Error occurred:", err);
                return reject(err);
            }
            resolve(true);
        });
    });
};

router.post('/login', async (req, res) => {
    const { emailID, password } = req.body;

    // Check if emailID and password are provided
    if (!emailID || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Authenticate user
        const isAuthenticated = await authenticateUser(emailID, password);

        if (isAuthenticated) {
            // If authentication succeeds, generate JWT token
            const token = jwt.sign({ emailID }, process.env.JWT_SECRET);

            // Send success response with token
            return res.status(200).json({ success:true, message: 'Login successful', token });
        } else {
            // If authentication fails, return an error response
            return res.status(200).json({ success:false, message: 'Invalid Email or Password' });
        }
    } catch (error) {
        // If an error occurs during authentication, return an error response
        console.error("Authentication error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/verifyEmail', async (req, res) => {
    const { emailID } = req.body;

    console.log(`Verifying email %s`, emailID);
    // Check if emailID and password are provided
    if (!emailID) {
        return res.status(400).json({ error: 'Email are required' });
    }

    try {
        // Authenticate user
        const userExists = await verifyUser(emailID);
        console.log("User exists %s", userExists);
        if (userExists) {
            return res.status(200).json({ message: 'User Exists', success: true });
        } else {
            // If authentication fails, return an error response
            return res.status(200).json({ message: 'User Does not Exists', success: false });
        }
    } catch (error) {
        // If an error occurs during authentication, return an error response
        console.log("Error Occured in Verifying Email %s", error)
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/signup', async (req, res) => {
    const { firstName, lastName, mobileNumber, emailID, password } = req.body;

    // Check if emailID and password are provided
    if (!emailID || !password || !firstName || !lastName || !mobileNumber) {
        return res.status(400).json({ error: 'Email, password, Mobile Number, First Name and Last Name are required' });
    }
    try {
        const emailExists = await verifyUser(emailID);
        if(emailExists) {
            // Send success response with token
            return res.status(200).json({ success:false, message: 'Email Exists Already' });
        }
        const createUserResponse = await createUser({ firstName, lastName, mobileNumber, emailID, password });
        if (createUserResponse) {
            // Send success response with token
            return res.status(200).json({ success:false, message: 'User Created Successfully' });
        }
    } catch (error) {
        // If an error occurs during authentication, return an error response
        return res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/resetPassword', async (req, res) => {
    const { emailID, password } = req.body;

    // Check if emailID and password are provided
    if (!emailID || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Authenticate user
        const resetResponse = await resetPassword(emailID, password);

        if (resetResponse) {
            return res.status(200).json({ message: 'Reset successful' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
