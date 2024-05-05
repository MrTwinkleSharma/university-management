const express = require('express');
const router = express.Router();

// GET /students
router.get('/', (req, res) => {
    try {
        // Query the database to fetch collections data

        global.db.query('SELECT * FROM collections', (err, collections) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            else {
                console.log(collections);
                // Send success response with fetched data
                return res.status(200).json(collections);
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
        // Extract collections data from the request body
        const { collectionID, studentID, amount, timestamp, comment } = req.body;
        const dbObject = {
            studentID, 
            amount, 
            timestamp, 
            comment
        }
        console.log(dbObject);
        if (collectionID) {
            console.log("Going to Update %s: %j", collectionID, dbObject)
            // Execute SQL INSERT query to update courses data into the database
            global.db.query('UPDATE collections SET ? WHERE collectionID = ?',
                [dbObject, collectionID], (err, updated) => {
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
            global.db.query('INSERT INTO collections SET ?',
                [dbObject], (err, added) => {
                    if (err) {
                        console.log(err);
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
        const { collectionID } = req.body;

        console.log("collectionID In Delete %j", collectionID);
        if (collectionID) {
            global.db.query('DELETE FROM collections WHERE collectionID = ?', [collectionID], (err, deleted) => {
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
