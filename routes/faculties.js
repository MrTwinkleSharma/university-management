const express = require('express');
const router = express.Router();

// GET /students
router.get('/', (req, res) => {
    try {
        // Query the database to fetch student data

        global.db.query('SELECT * FROM faculties', (err, faculties) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            else {
                console.log(faculties);
                // Send success response with fetched data
                return res.status(200).json(faculties);
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
        // Extract student data from the request body
        const { facultyID, firstName, lastName, dateOfBirth, departmentID, mobileNumber, emailID, address, joiningDate, specialization } = req.body;
        const dbObject = {
            firstName,
            lastName,
            dateOfBirth,
            departmentID,
            mobileNumber,
            emailID,
            address,
            joiningDate,
            specialization
        }
        console.log(dbObject);
        if (facultyID) {
            console.log("Going to Update %s: %j", facultyID, dbObject)
            // Execute SQL INSERT query to update student data into the database
            global.db.query('UPDATE faculties SET ? WHERE facultyID = ?',
                [dbObject, facultyID], (err, updated) => {
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
            // Execute SQL INSERT query to save student data into the database
            global.db.query('INSERT INTO faculties SET ?',
                [dbObject], (err, added) => {
                    if (err) {
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    else {
                        // Send success response with fetched data
                        console.log("Added %j", added);
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
        // Extract student data from the request body
        const { facultyID } = req.body;

        console.log("facultyID In Delete %j", facultyID);
        if (facultyID) {
            global.db.query('DELETE FROM faculties WHERE facultyID = ?', [facultyID], (err, deleted) => {
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
