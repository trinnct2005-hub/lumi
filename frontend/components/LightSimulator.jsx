window.LightSimulator = function LightSimulator() {
    const [cct, setCct] = React.useState(4000);
    const [lux, setLux] = React.useState(100);

    React.useEffect(() => {
        // Fetch initial config from backend
        fetch('http://localhost:3000/api/config')
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setCct(res.data.cct);
                    setLux(res.data.lux);
                }
            })
            .catch(err => console.log("Backend offline, using default config."));
    }, []);

    const syncToBackend = (data) => {
        fetch('http://localhost:3000/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(err => console.log("Failed to sync"));
    };

    const getCCTText = (value) => {
        if (value < 3500) return "Ấm (Thư giãn)";
        if (value > 5000) return "Lạnh (Tập trung)";
        return "Tự nhiên";
    };

    // Calculate light color based on CCT & Lux (More realistic Kelvin mapping)
    const getLightStyle = () => {
        let r, g, b;
        
        // Realistic interpolation mapping for CCT
        if (cct <= 4000) {
            // 2700K -> 4000K (Warm to Neutral White)
            let ratio = (cct - 2700) / (4000 - 2700);
            r = 255;
            g = 160 + (85 * ratio); // 160 -> 245
            b = 70 + (160 * ratio); // 70 -> 230
        } else {
            // 4000K -> 6500K (Neutral White to Cool Daylight)
            let ratio = (cct - 4000) / (6500 - 4000);
            r = 255 - (35 * ratio); // 255 -> 220
            g = 245 + (10 * ratio); // 245 -> 255
            b = 230 + (25 * ratio); // 230 -> 255
        }
        
        // Ensure values are within 0-255
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        let alpha = lux / 100;
        // Make the light glow more intense based on lux
        let glowSize = 30 + (lux * 0.7); 
        
        return {
            backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})`,
            boxShadow: `0 0 ${glowSize}px rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`
        };
    };

    return (
        <section id="hcl" className="section hcl-section">
            <h2 className="section-title">Công nghệ HCL <br/>(Human-Centric Lighting)</h2>
            <p className="section-desc">Mô phỏng nhịp sinh học: Trắng lạnh tập trung ban ngày, vàng ấm thư giãn ban đêm.</p>
            
            <div className="glass-container">
                <div className="simulator-container">
                <div className="info-panel">
                    <div className="info-card" style={{ position: 'relative' }}>
                        <div className="light-preview-box" style={{
                            ...getLightStyle(), 
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                            borderRadius: '16px', zIndex: -1, transition: 'all 0.3s'
                        }}></div>
                        <h3>Trạng thái hiện tại</h3>
                        <p className="lux-value">Độ sáng: {lux}%</p>
                        <p className="cct-value">{cct}K</p>
                    </div>
                </div>
                
                <div className="controls">
                    <div className="control-group">
                        <label>Nhiệt độ màu (CCT) - <span>{cct}K ({getCCTText(cct)})</span></label>
                        <input type="range" min="2700" max="6500" value={cct} step="100" 
                            onChange={(e) => setCct(Number(e.target.value))}
                            onMouseUp={(e) => syncToBackend({ cct: Number(e.target.value) })} 
                            onTouchEnd={(e) => syncToBackend({ cct: Number(e.target.value) })}
                        />
                        <div className="slider-labels">
                            <span>2700K (Ấm)</span>
                            <span>6500K (Lạnh)</span>
                        </div>
                    </div>
                    
                    <div className="control-group">
                        <label>Cường độ sáng (Lux) - <span>{lux}%</span></label>
                        <input type="range" min="10" max="100" value={lux} step="1" 
                            onChange={(e) => setLux(Number(e.target.value))}
                            onMouseUp={(e) => syncToBackend({ lux: Number(e.target.value) })}
                            onTouchEnd={(e) => syncToBackend({ lux: Number(e.target.value) })}
                        />
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};
