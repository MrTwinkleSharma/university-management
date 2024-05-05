const express = require('express');
const router = express.Router();

// GET /students
router.get('/', (req, res) => {
    try {
        // Query the database to fetch courses data

        global.db.query('SELECT * FROM courses', (err, courses) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            else {
                console.log(courses);
                // Send success response with fetched data
                return res.status(200).json(courses);
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
        const { courseID, courseName, courseDuration, courseFees } = req.body;
        const dbObject = {
            courseName,
            courseDuration,
            courseFees,
        }
        console.log(dbObject);
        if (courseID) {
            console.log("Going to Update %s: %j", courseID, dbObject)
            // Execute SQL INSERT query to update courses data into the database
            global.db.query('UPDATE courses SET ? WHERE courseID = ?',
                [dbObject, courseID], (err, updated) => {
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
            global.db.query('INSERT INTO courses SET ?',
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
        const { courseID } = req.body;

        console.log("courseID In Delete %j", courseID);
        if (courseID) {
            global.db.query('DELETE FROM courses WHERE courseID = ?', [courseID], (err, deleted) => {
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
