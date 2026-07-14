const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Built-in middleware for JSON parsing

// API Routes
app.use('/api', routes);

// Bắt lỗi các route không tồn tại nếu chưa được xử lý
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`[LumiLight BE] Express Server is running on http://localhost:${PORT}`);
});
