
const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
    try {
        // Query the database to fetch student data

        global.db.query('SELECT * FROM students', (err, students) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            else {
                console.log(students);
                // Send success response with fetched data
                return res.status(200).json(students);
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
        const { studentID, firstName, lastName, dateOfBirth, courseName, mobileNumber, emailID, address, joiningDate, admissionYear, totalFeesCollected } = req.body;
        const dbObject = {
            firstName,
            lastName,
            dateOfBirth,
            courseName,
            mobileNumber,
            emailID,
            address,
            joiningDate,
            admissionYear,
            totalFeesCollected
        }
        if (studentID) {
            console.log("Going to Update %s: %j", studentID, dbObject)
            // Execute SQL INSERT query to update student data into the database
            global.db.query('UPDATE students SET ? WHERE studentID = ?',
                [dbObject, studentID], (err, updated) => {
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
            global.db.query('INSERT INTO students SET ?',
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
        // Extract student data from the request body
        const { studentID } = req.body;

        console.log("studentID In Delete %j", studentID);
        if (studentID) {
            global.db.query('DELETE FROM students WHERE studentID = ?', [studentID], (err, deleted) => {
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