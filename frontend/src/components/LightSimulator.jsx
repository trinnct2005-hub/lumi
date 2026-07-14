import { useState, useEffect } from 'react';
export default function LightSimulator() {
    const [hour, setHour] = useState(8);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setHour(h => {
                    let next = h + 0.1;
                    return next >= 24 ? 0 : next;
                });
            }, 50); // Speed of the day cycle
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    // Calculate CCT and Lux based on Hour (HCL Logic)
    let cct = 4000;
    let lux = 50;
    let modeText = "";

    if (hour >= 6 && hour < 17) {
        let ratio = Math.min((hour - 6) / 2, 1); // 6 to 8 transitions to max
        cct = 2700 + (6500 - 2700) * ratio;
        lux = 20 + 80 * ratio;
        modeText = "☀️ Ban ngày (Tập trung): Ánh sáng trắng lạnh giúp tỉnh táo, ngăn tiết Melatonin.";
    } else if (hour >= 17 && hour < 22) {
        let ratio = (hour - 17) / 5; // 17 to 22 transitions to warm
        cct = 6500 - (6500 - 2700) * ratio;
        lux = 100 - 70 * ratio;
        modeText = "🌅 Chiều tối (Thư giãn): Chuyển dần sang ánh sáng ấm, chuẩn bị cho nhịp sinh học nghỉ ngơi.";
    } else {
        cct = 2700;
        lux = 20;
        modeText = "🌙 Ban đêm (Dễ ngủ): Ánh sáng vàng nhạt, không có ánh sáng xanh, kích thích Melatonin.";
    }

    // Round values
    cct = Math.round(cct);
    lux = Math.round(lux);

    let whiteRatio = (cct - 2700) / (6500 - 2700);
    let yellowRatio = 1 - whiteRatio;

    const formatTime = (h) => {
        let hrs = Math.floor(h);
        let mins = Math.floor((h - hrs) * 60);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    return (
        <section id="hcl" className="section hcl-section">
            <h2 className="section-title">HCL <span>& Anti-Blue Light</span></h2>
            <p className="section-desc">Mô phỏng nhịp sinh học tự động: Tự động điều chỉnh ánh sáng pha trộn theo thời gian trong ngày để bảo vệ mắt và sức khỏe của bạn.</p>
            
            <div className="glass-container">
                <div className="simulator-container">
                <div className="info-panel">
                    <div className="lamp-simulation-area">
                        <div className="sim-lamp-head">
                            <div className="led-indicator white-led" style={{ opacity: whiteRatio * (lux/50) }}></div>
                            <div className="led-indicator yellow-led" style={{ opacity: yellowRatio * (lux/50) }}></div>
                        </div>
                        
                        {/* Two separate light beams mixing */}
                        <div className="sim-light-beam-white" style={{ opacity: whiteRatio * (lux/100) }}></div>
                        <div className="sim-light-beam-yellow" style={{ opacity: yellowRatio * (lux/100) }}></div>
                        
                        <div className="sim-stats">
                            <p className="cct-value">{cct}K</p>
                            <p className="lux-value">Độ sáng: {lux}%</p>
                        </div>
                    </div>
                </div>
                
                <div className="controls">
                    <div className="time-control-box">
                        <h3>Mô phỏng Thời gian thực</h3>
                        <div className="time-display">{formatTime(hour)}</div>
                        <p className="mode-desc">{modeText}</p>
                        
                        <div className="control-group" style={{marginTop: '2rem'}}>
                            <input type="range" min="0" max="23.9" value={hour} step="0.1" 
                                onChange={(e) => {
                                    setHour(Number(e.target.value));
                                    setIsAutoPlaying(false);
                                }}
                            />
                            <div className="slider-labels">
                                <span>00:00</span>
                                <span>12:00</span>
                                <span>23:59</span>
                            </div>
                        </div>
                        
                        <button className="cta-button" style={{padding: '0.8rem 2rem', fontSize: '0.9rem', marginTop: '1rem'}} 
                                onClick={() => setIsAutoPlaying(!isAutoPlaying)}>
                            {isAutoPlaying ? "Tạm dừng" : "Tự động chạy"}
                        </button>
                    </div>

                    <div className="hardware-logic-box" style={{marginTop: '2rem'}}>
                        <h4>Thuật toán Pha trộn Kép (Zero-Flicker)</h4>
                        <p style={{fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem'}}>
                            LumiLight dùng 2 nguồn LED vật lý riêng biệt pha trộn với nhau qua PWM để ra màu thực tế, bảo vệ mắt tuyệt đối khỏi ánh sáng xanh chói.
                        </p>
                        <div className="pwm-bar-container">
                            <div className="pwm-label">LED Trắng (6500K) <span>{Math.round(whiteRatio * 100)}%</span></div>
                            <div className="pwm-bar"><div className="pwm-fill white-fill" style={{width: `${whiteRatio * 100}%`}}></div></div>
                        </div>
                        <div className="pwm-bar-container">
                            <div className="pwm-label">LED Vàng (2700K) <span>{Math.round(yellowRatio * 100)}%</span></div>
                            <div className="pwm-bar"><div className="pwm-fill yellow-fill" style={{width: `${yellowRatio * 100}%`}}></div></div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};
