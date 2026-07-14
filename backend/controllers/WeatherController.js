const DataService = require('../services/DataService');

class WeatherController {
    constructor() {
        this.dataService = new DataService();
    }

    // [GET] /api/weather
    getWeather(req, res) {
        try {
            // Lấy dữ liệu thời tiết (Mock từ service)
            const weatherData = this.dataService.getCurrentWeather();
            
            res.writeHead(200);
            res.end(JSON.stringify({
                success: true,
                data: weatherData
            }));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to fetch weather data' }));
        }
    }
}

module.exports = WeatherController;
