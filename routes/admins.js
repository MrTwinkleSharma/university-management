
const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
    try {
        // Query the database to fetch admin data

        global.db.query('SELECT * FROM admins', (err, admins) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            else {
                console.log(admins);
                // Send success response with fetched data
                return res.status(200).json(admins);
            }
        });

    } catch (error) {
        // If an error occurs during database query, return an error response
        console.error("Database error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/', async (req, res) => {
    try {
        // Extract admin data from the request body
        const { adminID, firstName, lastName,   mobileNumber, emailID, password } = req.body;
        const dbObject = {
            firstName,
            lastName,
            mobileNumber,
            emailID,
            password,
        }
        if (adminID) {
            console.log("Going to Update %s: %j", adminID, dbObject)
            delete dbObject.password;
            // Execute SQL INSERT query to update admin data into the database
            global.db.query('UPDATE admins SET ? WHERE adminID = ?',
                [dbObject, adminID], (err, updated) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    else {
                        // Send success response with fetched data
                        return res.status(200).json(updated);
                    }
                });
        } else {
            // Execute SQL INSERT query to save admin data into the database
            global.db.query('INSERT INTO admins SET ?',
                [dbObject], (err, added) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    else {
                        // Send success response with fetched data
                        return res.status(200).json(added);
                    }
                });
        }

    } catch (error) {
        // If an error occurs during database query or processing, return an error response
        console.error("Database error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});




router.delete('/', async (req, res) => {
    try {
        // Extract admin data from the request body
        const { adminID } = req.body;

        console.log("adminID In Delete %j", adminID);
        if (adminID) {
            global.db.query('DELETE FROM admins WHERE adminID = ?', [adminID], (err, deleted) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                else {
                    // Send success response with fetched data
                    return res.status(200).json(deleted);
                }
            });
        } else {
            return res.status(400).json({ error: 'Invalid Input' });

        }

    } catch (error) {
        // If an error occurs during database query or processing, return an error response
        console.error("Database error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;