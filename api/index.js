const express = require('express');
const cors = require('cors');
const routes = require('../backend/routes');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', routes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Export the Express API for Vercel Serverless Functions
module.exports = app;
