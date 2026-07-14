const http = require('http');
const routes = require('./routes');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Add CORS headers so Frontend can call this API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Pass the request to the router
    routes.handleRequest(req, res);
});

server.listen(PORT, () => {
    console.log(`[LumiLight BE] Server is running on http://localhost:${PORT}`);
});
