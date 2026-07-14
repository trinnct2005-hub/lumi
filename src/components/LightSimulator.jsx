import { useState, useEffect } from 'react';
export default function LightSimulator() {
    const [ambient, setAmbient] = useState(50);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setAmbient(a => {
                    let next = a + direction * 0.5;
                    if (next >= 100) {
                        setDirection(-1);
                        return 100;
                    }
                    if (next <= 0) {
                        setDirection(1);
                        return 0;
                    }
                    return next;
                });
            }, 50);
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying, direction]);

    // Logic: Ánh sáng môi trường càng sáng -> Đèn càng trung hòa (sáng vừa phải, màu trung tính)
    // Ánh sáng môi trường càng tối -> Đèn càng sáng (để bù sáng)
    
    let cct = 4000;
    let lux = 50;
    let modeText = "";

    if (ambient > 70) {
        // Môi trường sáng rực
        cct = 5000 + ((ambient - 70) / 30) * 1500; // 5000K -> 6500K
        lux = 20 + ((100 - ambient) / 30) * 20; // 40% -> 20%
        modeText = "☀️ Môi trường sáng: Đèn chuyển sang trạng thái trung hòa, tiết kiệm năng lượng và hòa quyện với ánh sáng tự nhiên.";
    } else if (ambient > 30) {
        // Môi trường bình thường
        let ratio = (ambient - 30) / 40;
        cct = 4000 + ratio * 1000; // 4000K -> 5000K
        lux = 60 - ratio * 20; // 60% -> 40%
        modeText = "⛅ Môi trường bình thường: Ánh sáng và màu sắc cân bằng (True Tone), giúp mắt thoải mái nhất.";
    } else {
        // Môi trường tối
        let ratio = ambient / 30;
        cct = 2700 + ratio * 1300; // 2700K -> 4000K
        lux = 100 - ratio * 40; // 100% -> 60%
        modeText = "🌙 Môi trường tối: Đèn tự động tăng độ sáng để bù sáng, chuyển màu ấm để bảo vệ thị lực.";
    }

    // Round values
    cct = Math.round(cct);
    lux = Math.round(lux);
    let displayAmbient = Math.round(ambient);

    let whiteRatio = (cct - 2700) / (6500 - 2700);
    let yellowRatio = 1 - whiteRatio;

    return (
        <section id="hcl" className="section hcl-section">
            <div className="bg-watermark">TRUE TONE</div>
            <h2 className="section-title">Cảm biến <span>True Tone & Auto-Brightness</span></h2>
            <p className="section-desc">Mô phỏng giống màn hình điện thoại thông minh: Đèn tự động nhận diện ánh sáng môi trường để điều chỉnh độ sáng và nhiệt độ màu (CCT) theo thời gian thực.</p>
            
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
                            <p className="lux-value">Độ sáng đèn: {lux}%</p>
                        </div>
                    </div>
                </div>
                
                <div className="controls">
                    <div className="time-control-box">
                        <h3>Mô phỏng Cảm biến Môi trường</h3>
                        <div className="time-display">{displayAmbient}%</div>
                        <p style={{textAlign: 'center', color: '#facc15', fontSize: '0.9rem'}}>Độ sáng môi trường xung quanh</p>
                        <p className="mode-desc" style={{marginTop: '1rem'}}>{modeText}</p>
                        
                        <div className="control-group" style={{marginTop: '2rem'}}>
                            <input type="range" min="0" max="100" value={ambient} step="1" 
                                onChange={(e) => {
                                    setAmbient(Number(e.target.value));
                                    setIsAutoPlaying(false);
                                }}
                            />
                            <div className="slider-labels">
                                <span>Tối (0%)</span>
                                <span>Bình thường</span>
                                <span>Sáng (100%)</span>
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
