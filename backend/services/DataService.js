class DataService {
    // Phương thức mô phỏng việc gọi API thời tiết thực tế
    getCurrentWeather() {
        // Trong thực tế sẽ dùng axios/fetch gọi OpenWeatherMap API
        // Trả về dữ liệu mock cho prototype
        return {
            temperature: 26,
            condition: "Sunny",
            icon: "☀️",
            humidity: 65,
            location: "Hà Nội"
        };
    }
}

module.exports = DataService;
