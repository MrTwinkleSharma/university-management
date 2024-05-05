require('dotenv').config();
const dataBaseAdapter = require('./dataBaseAdapter.js'); // Import your dataBaseAdapter module
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
// Assuming isAuthenticated middleware is defined somewhere
const isAuthenticated = require('./middlewares/authenticate.js');

const app = express();

const fs = require('fs');
const path = require('path');

// Define the file path for logs
const logFilePath = path.join(__dirname, 'logs.txt');

// Create a writable stream to the log file
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' }); // 'a' stands for append mode

// Redirect console.log to write to the log file
const originalLog = console.log;
console.log = function(data) {
    originalLog.apply(console, arguments); // To keep the original console behavior
    logStream.write(`${new Date().toString()} - ${data}\n`);
};

// Now, when you use console.log, it will also write to the log file

// Example usage:

// Don't forget to close the stream when your application exits
process.on('exit', () => {
    logStream.end(); // Close the stream
});

// Connect to the database
const db = dataBaseAdapter.get();
global.db = db;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Routes
const auth = require('./routes/authenticate.js');
app.use('/authenticate', auth);

const apiRoutes = require('./routes/index.js');
// Protected routes, requires authentication
app.use('/api', isAuthenticated, apiRoutes);

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ 'error': 'Not found' });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ 'error': err.message });
});


var server = http.createServer(app).listen(process.env.PORT || 5000);

module.exports = app;
