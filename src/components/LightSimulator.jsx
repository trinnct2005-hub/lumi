import { useState, useEffect } from 'react';
export default function LightSimulator() {
    const [ambientLight, setAmbientLight] = useState(50); // 0-100%
    const [timeOfDay, setTimeOfDay] = useState(12); // 0-24 hours
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [ambientDirection, setAmbientDirection] = useState(1);
    const [timeDirection, setTimeDirection] = useState(1);
    const [aiStats, setAiStats] = useState({ clicks: 15, scroll: 20, keys: 10 });
    const [aiMode, setAiMode] = useState('THẢNH THƠI');

    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setAmbientLight(a => {
                    let next = a + ambientDirection * 0.5;
                    if (next >= 100) { setAmbientDirection(-1); return 100; }
                    if (next <= 0) { setAmbientDirection(1); return 0; }
                    return next;
                });
                setTimeOfDay(t => {
                    let next = t + timeDirection * 0.1;
                    if (next >= 24) { setTimeDirection(-1); return 24; }
                    if (next <= 0) { setTimeDirection(1); return 0; }
                    return next;
                });
            }, 50);
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying, ambientDirection, timeDirection]);

    // AI Focus State - cycles every few seconds (0: Relax, 1: Normal, 2: Focus)
    const [aiFocusState, setAiFocusState] = useState(0);

    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setAiFocusState(prev => (prev + 1) % 3);
            }, 6000); // Switch state every 6 seconds
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    // AI Simulation Timer
    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setAiStats(prev => {
                    let newClicks = prev.clicks;
                    let newScroll = prev.scroll;
                    let newKeys = prev.keys;

                    if (aiFocusState === 2) {
                        newClicks = Math.min(100, newClicks + Math.random() * 25 + 10);
                        newScroll = Math.min(100, newScroll + Math.random() * 20 + 10);
                        newKeys = Math.min(100, newKeys + Math.random() * 30 + 10);
                    } else if (aiFocusState === 1) {
                        newClicks += (50 - newClicks) * 0.2 + (Math.random() * 20 - 10);
                        newScroll += (50 - newScroll) * 0.2 + (Math.random() * 20 - 10);
                        newKeys += (50 - newKeys) * 0.2 + (Math.random() * 20 - 10);
                        newClicks = Math.max(30, Math.min(70, newClicks));
                        newScroll = Math.max(30, Math.min(70, newScroll));
                        newKeys = Math.max(30, Math.min(70, newKeys));
                    } else {
                        newClicks = Math.max(5, newClicks - Math.random() * 25 - 10);
                        newScroll = Math.max(5, newScroll - Math.random() * 20 - 10);
                        newKeys = Math.max(5, newKeys - Math.random() * 30 - 10);
                    }

                    const avg = (newClicks + newScroll + newKeys) / 3;
                    if (avg >= 70) {
                        setAiMode('TẬP TRUNG');
                    } else if (avg >= 35) {
                        setAiMode('BÌNH THƯỜNG');
                    } else {
                        setAiMode('THẢNH THƠI');
                    }

                    return { clicks: newClicks, scroll: newScroll, keys: newKeys };
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying, aiFocusState]);

    let cct = 4000;
    let timeText = "";
    if (timeOfDay >= 6 && timeOfDay < 10) {
        let ratio = (timeOfDay - 6) / 4;
        cct = 2700 + ratio * (6500 - 2700);
        timeText = "🌅 Sáng (6h-10h): Chuyển dần sang ánh sáng trắng để đánh thức cơ thể.";
    } else if (timeOfDay >= 10 && timeOfDay < 15) {
        cct = 6500;
        timeText = "☀️ Trưa (10h-15h): Ưu tiên ánh sáng trắng giúp tập trung làm việc.";
    } else if (timeOfDay >= 15 && timeOfDay < 19) {
        let ratio = (timeOfDay - 15) / 4;
        cct = 6500 - ratio * (6500 - 2700);
        timeText = "🌇 Chiều (15h-19h): Ánh sáng ngả vàng dần để mắt thư giãn.";
    } else {
        cct = 2700;
        timeText = "🌙 Tối/Đêm (19h-6h): Ánh sáng vàng ấm bảo vệ thị lực và dễ ngủ.";
    }

    let lux = 50;
    let ambientText = "";
    if (ambientLight > 70) {
        let ratio = (ambientLight - 70) / 30;
        lux = 30 - ratio * 20;
        ambientText = "Môi trường rất sáng: Đèn giảm cường độ (10-30%) để tiết kiệm điện.";
    } else if (ambientLight > 30) {
        let ratio = (ambientLight - 30) / 40;
        lux = 70 - ratio * 40;
        ambientText = "Môi trường vừa phải: Đèn điều chỉnh cường độ cân bằng (30-70%).";
    } else {
        let ratio = ambientLight / 30;
        lux = 100 - ratio * 30;
        ambientText = "Môi trường thiếu sáng: Đèn tăng cường độ (70-100%) để bù sáng.";
    }

    cct = Math.round(cct);
    lux = Math.round(lux);
    
    let whiteRatio = (cct - 2700) / (6500 - 2700);
    let yellowRatio = 1 - whiteRatio;

    const aiProps = aiMode === 'TẬP TRUNG' 
        ? { text: '🔥 TẬP TRUNG (WORK)', color: '#facc15', cct: '6500K', lux: '100% Cường độ', white: 1, yellow: 0 }
        : aiMode === 'BÌNH THƯỜNG' 
        ? { text: '🌿 BÌNH THƯỜNG (NORMAL)', color: '#34d399', cct: '4500K', lux: '70% Cường độ', white: 0.5, yellow: 0.5 }
        : { text: '☕ THẢNH THƠI (RELAX)', color: '#38bdf8', cct: '3000K', lux: '40% Cường độ', white: 0, yellow: 0.8 };

    return (
        <section id="hcl" className="section hcl-section">
            <div className="bg-watermark">TRUE TONE</div>
            <h2 className="section-title">Cảm biến <span>True Tone & Auto-Brightness</span></h2>
            <p className="section-desc">Mô phỏng giống màn hình điện thoại thông minh: Đèn tự động nhận diện ánh sáng môi trường để điều chỉnh độ sáng và nhiệt độ màu (CCT) theo thời gian thực.</p>
            
            <div className="glass-container" style={{display: 'flex', flexDirection: 'column', padding: '2rem'}}>
                
                {/* --- ROW 1: True Tone & Zero-Flicker --- */}
                <div className="simulator-container" style={{marginBottom: '3rem'}}>
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
                            <h3>Mô phỏng True Tone & Auto-Brightness</h3>
                            <p style={{fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '0.5rem', textAlign: 'center'}}>
                                *Giao diện chỉ mang tính minh họa để biểu diễn thuật toán.
                            </p>
                            
                            <div className="control-group" style={{marginTop: '1.5rem'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', color: '#facc15', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                                    <span>Thời gian trong ngày (Chỉnh Màu)</span>
                                    <span>{Math.floor(timeOfDay)}h{Math.floor((timeOfDay % 1) * 60).toString().padStart(2, '0')}</span>
                                </div>
                                <input type="range" min="0" max="24" value={timeOfDay} step="0.1" 
                                    onChange={(e) => {
                                        setTimeOfDay(Number(e.target.value));
                                        setIsAutoPlaying(false);
                                    }}
                                />
                                <p className="mode-desc" style={{marginTop: '0.5rem', fontSize: '0.85rem', color: '#94a3b8'}}>{timeText}</p>
                            </div>

                            <div className="control-group" style={{marginTop: '1.5rem'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', color: '#facc15', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                                    <span>Cảm biến BH1750 (Chỉnh Độ Sáng)</span>
                                    <span>{Math.round(ambientLight)}%</span>
                                </div>
                                <input type="range" min="0" max="100" value={ambientLight} step="1" 
                                    onChange={(e) => {
                                        setAmbientLight(Number(e.target.value));
                                        setIsAutoPlaying(false);
                                    }}
                                />
                                <p className="mode-desc" style={{marginTop: '0.5rem', fontSize: '0.85rem', color: '#94a3b8'}}>{ambientText}</p>
                            </div>
                            
                            <button className="cta-button" style={{padding: '0.8rem 2rem', fontSize: '0.9rem', marginTop: '1.5rem', width: '100%'}} 
                                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}>
                                {isAutoPlaying ? "Tạm dừng Mô phỏng" : "Tự động chạy"}
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

                {/* Divider */}
                <div style={{height: '1px', background: 'rgba(255,255,255,0.1)', width: '100%', margin: '1rem 0 3rem 0'}}></div>

                {/* --- ROW 2: AI Focus Mode --- */}
                <div className="simulator-container">
                    <div className="info-panel" style={{display: 'flex', flexDirection: 'column'}}>
                        <h3 style={{color: '#f8fafc', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold'}}>Mô phỏng Đèn AI Trực quan</h3>
                        
                        {/* Big Lamp for AI */}
                        <div className="lamp-simulation-area">
                            <div className="sim-lamp-head">
                                <div className="led-indicator white-led" style={{ opacity: aiProps.white * 2, transition: 'opacity 1s ease' }}></div>
                                <div className="led-indicator yellow-led" style={{ opacity: aiProps.yellow, transition: 'opacity 1s ease' }}></div>
                            </div>
                            
                            {/* AI Light beams */}
                            <div className="sim-light-beam-white" style={{ opacity: aiProps.white, transition: 'opacity 1s ease' }}></div>
                            <div className="sim-light-beam-yellow" style={{ opacity: aiProps.yellow * 0.5, transition: 'opacity 1s ease' }}></div>
                            
                            <div className="sim-stats" style={{transition: 'all 0.5s ease'}}>
                                <p className="cct-value" style={{textShadow: `0 2px 15px ${aiProps.color}`}}>{aiProps.cct}</p>
                                <p className="lux-value" style={{fontWeight: 'bold', color: aiProps.color}}>{aiProps.lux}</p>
                            </div>
                        </div>
                    </div>

                    <div className="controls">
                        <div className="hardware-logic-box" style={{height: '100%'}}>
                            <h4 style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem'}}>
                                <span style={{color: '#facc15'}}>✨</span> AI Nhận Diện Trạng Thái Làm Việc
                            </h4>
                            <p style={{fontSize: '0.95rem', color: '#94a3b8', marginTop: '0.8rem', lineHeight: '1.6'}}>
                                Thuật toán AI của chúng tôi sử dụng mô hình có trọng số để phân tích hành vi người dùng thông qua: <strong>số lần click chuột, thời gian click, tốc độ cuộn trang (scroll) và tần suất gõ phím (keystrokes)</strong>.
                            </p>
                            <p style={{fontSize: '0.95rem', color: '#94a3b8', marginTop: '0.5rem', lineHeight: '1.6'}}>
                                Nhờ đó, đèn có thể nhận diện chính xác khi nào bạn đang <strong>tập trung cao độ (đánh máy liên tục)</strong> và khi nào đang <strong>thảnh thơi (lướt web đọc tin)</strong>. Hệ thống sẽ tự động kích hoạt chế độ tương ứng, tự động tăng cường độ sáng để bảo vệ mắt khi bạn cần sự tập trung tuyệt đối.
                            </p>

                            {/* AI Simulation Box */}
                            <div style={{
                                marginTop: '2rem', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', 
                                borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem'}}>
                                    <span style={{fontSize: '0.9rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px'}}>Trạng thái phân tích:</span>
                                    <span style={{
                                        fontWeight: '800', fontSize: '1rem',
                                        color: aiProps.color,
                                        textShadow: `0 0 15px ${aiProps.color}80`,
                                        transition: 'all 0.5s ease'
                                    }}>
                                        {aiProps.text}
                                    </span>
                                </div>
                                
                                <div className="pwm-bar-container" style={{marginBottom: '1rem'}}>
                                    <div className="pwm-label" style={{fontSize: '0.8rem'}}>Tần suất Click chuột <span>{Math.round(aiStats.clicks)}%</span></div>
                                    <div className="pwm-bar" style={{height: '8px', background: 'rgba(255,255,255,0.1)'}}>
                                        <div className="pwm-fill" style={{width: `${aiStats.clicks}%`, background: aiProps.color, transition: 'width 0.8s ease-out, background 0.5s ease'}}></div>
                                    </div>
                                </div>
                                <div className="pwm-bar-container" style={{marginBottom: '1rem'}}>
                                    <div className="pwm-label" style={{fontSize: '0.8rem'}}>Tốc độ Cuộn (Scroll) <span>{Math.round(aiStats.scroll)}%</span></div>
                                    <div className="pwm-bar" style={{height: '8px', background: 'rgba(255,255,255,0.1)'}}>
                                        <div className="pwm-fill" style={{width: `${aiStats.scroll}%`, background: aiProps.color, transition: 'width 0.8s ease-out, background 0.5s ease'}}></div>
                                    </div>
                                </div>
                                <div className="pwm-bar-container">
                                    <div className="pwm-label" style={{fontSize: '0.8rem'}}>Tần suất Gõ phím (Keys) <span>{Math.round(aiStats.keys)}%</span></div>
                                    <div className="pwm-bar" style={{height: '8px', background: 'rgba(255,255,255,0.1)'}}>
                                        <div className="pwm-fill" style={{width: `${aiStats.keys}%`, background: aiProps.color, transition: 'width 0.8s ease-out, background 0.5s ease'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
