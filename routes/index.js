const express = require('express');
const router = express.Router();

// GET /students
router.get('/students', (req, res) => {
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


router.post('/students', async (req, res) => {
    try {
        // Extract student data from the request body
        const { studentID, firstName, lastName, dateOfBirth, courseName, mobileNumber, emailID, address, joiningDate, admissionYear, feesCollected } = req.body;
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
            feesCollected
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




router.delete('/students', async (req, res) => {
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


// GET /students
router.get('/faculties', (req, res) => {
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


router.post('/faculties', async (req, res) => {
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




router.delete('/faculties', async (req, res) => {
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



// GET /students
router.get('/courses', (req, res) => {
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


router.post('/courses', async (req, res) => {
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




router.delete('/courses', async (req, res) => {
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



// GET /students
router.get('/departments', (req, res) => {
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


router.post('/departments', async (req, res) => {
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




router.delete('/departments', async (req, res) => {
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




// GET /students
router.get('/collections', (req, res) => {
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


router.post('/collections', async (req, res) => {
    try {
        // Extract collections data from the request body
        const { collectionID, studentID, amount, timestamp, comment } = req.body;
        const dbObject = {
            collectionID,
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




router.delete('/collections', async (req, res) => {
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
