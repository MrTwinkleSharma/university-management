const express = require('express');
const router = express.Router();


// GET /students
router.get('/', (req, res) => {
    try {
        // Query the database to fetch departments data

        global.db.query('SELECT * FROM departments', (err, departments) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            else {
                console.log(departments);
                // Send success response with fetched data
                return res.status(200).json(departments);
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
        // Extract course data from the request body
        const { departmentID, departmentName, headOfDepartment } = req.body;
        const dbObject = {
            departmentName,
            headOfDepartment,
        }
        console.log(dbObject);
        if (departmentID) {
            console.log("Going to Update %s: %j", departmentID, dbObject)
            // Execute SQL INSERT query to update courses data into the database
            global.db.query('UPDATE departments SET ? WHERE departmentID = ?',
                [dbObject, departmentID], (err, updated) => {
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
            // Execute SQL INSERT query to save courses data into the database
            global.db.query('INSERT INTO departments SET ?',
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
        const { departmentID } = req.body;

        console.log("departmentID In Delete %j", departmentID);
        if (departmentID) {
            global.db.query('DELETE FROM departments WHERE departmentID = ?', [departmentID], (err, deleted) => {
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
