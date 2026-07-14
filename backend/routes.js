const url = require('url');
const fs = require('fs');
const path = require('path');
const ConfigController = require('./controllers/ConfigController');
const WeatherController = require('./controllers/WeatherController');

const configController = new ConfigController();
const weatherController = new WeatherController();

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jsx': 'text/babel',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
};

function handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    const method = req.method;

    // --- API ROUTES ---
    if (pathname.startsWith('/api/')) {
        res.setHeader('Content-Type', 'application/json');
        
        if (pathname === '/api/config' && method === 'GET') {
            return configController.getConfig(req, res);
        } else if (pathname === '/api/config' && method === 'POST') {
            return configController.updateConfig(req, res);
        } else if (pathname === '/api/weather' && method === 'GET') {
            return weatherController.getWeather(req, res);
        } else {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: 'Route not found' }));
        }
    }

    // --- STATIC FILE SERVING (FRONTEND) ---
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const filePath = path.join(__dirname, '../frontend', pathname);
    const ext = path.extname(filePath).toLowerCase();
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

module.exports = { handleRequest };
