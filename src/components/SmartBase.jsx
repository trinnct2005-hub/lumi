import { useState, useEffect } from 'react';
export default function SmartBase() {
    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState({
        temperature: '...',
        icon: '...',
        humidity: '...',
        location: '...'
    });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetch('/api/weather')
            .then(res => res.json())
            .then(res => {
                if(res.success) setWeather(res.data);
            })
            .catch(err => console.log("Backend offline, using mock weather data"));
    }, []);

    return (
        <section id="smartbase" className="section smartbase-section">
            <div className="bg-watermark">SMART HUB</div>
            <h2 className="section-title">Đế đèn All-in-One (Màn hình TFT)</h2>
            <p className="section-desc">Giải phóng không gian bàn học. Tích hợp đồng hồ, nhiệt kế và thời tiết thời gian thực (Lấy từ Backend).</p>
            
            <div className="glass-container">
                <div className="smartbase-container">
                <div className="tft-screen">
                    <div className="tft-header">
                        <span className="weather-icon">{weather.icon}</span>
                        <span className="temperature">{weather.temperature}°C</span>
                    </div>
                    <div className="tft-time">
                        {time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="tft-date">
                        {time.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                    <div className="tft-footer">
                        <span>Độ ẩm: {weather.humidity}%</span>
                        <span>{weather.location}</span>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
