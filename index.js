const dataBaseAdapter = require('./dataBaseAdapter.js'); // Import your dataBaseAdapter module
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
// Assuming isAuthenticated middleware is defined somewhere
const isAuthenticated = require('./middlewares/authenticate.js');

const app = express();

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


var server = http.createServer(app).listen(5000);

module.exports = app;
