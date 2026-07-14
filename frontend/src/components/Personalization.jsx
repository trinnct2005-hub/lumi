import { useState, useRef } from 'react';

const LAMP_COLORS = [
    { name: 'Trắng Ngọc (Pearl)', bg: '#f8fafc', text: '#f1f5f9', shadow: 'rgba(15,23,42,0.2)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Đen Nhám (Matte)', bg: '#0f172a', text: '#020617', shadow: 'rgba(0,0,0,0.9)', highlight: 'rgba(255,255,255,0.08)' },
    { name: 'Vàng Hồng (Rose Gold)', bg: '#fff1f2', text: '#ffe4e6', shadow: 'rgba(159,18,57,0.15)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Xanh Bạc Hà (Mint)', bg: '#f0fdf4', text: '#dcfce7', shadow: 'rgba(21,128,61,0.15)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Tím Khói (Lavender)', bg: '#f5f3ff', text: '#ede9fe', shadow: 'rgba(76,29,149,0.15)', highlight: 'rgba(255,255,255,1)' }
];

export default function Personalization() {
    const [name, setName] = useState('');
    const [activeColor, setActiveColor] = useState(LAMP_COLORS[0]);
    const typingTimer = useRef(null);

    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);

        clearTimeout(typingTimer.current);
        typingTimer.current = setTimeout(() => {
            fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: val || 'LUMILIGHT' })
            }).catch(err => console.log("Failed to sync name"));
        }, 1000);
    };

    return (
        <section id="personalize" className="section personalize-section">
            <div className="bg-watermark">UNIQUE</div>
            <h2 className="section-title">Zero-Cost Personalization</h2>
            <p className="section-desc">Công nghệ in 3D PETG cho phép khắc tên cá nhân hóa hoàn toàn miễn phí. Độc bản như chính bạn.</p>
            
            <div className="glass-container">
                <div className="personalize-container">
                <div className="input-area">
                    <input type="text" placeholder="Nhập tên của bạn..." maxLength="15" autoComplete="off" 
                        value={name} onChange={handleNameChange} id="nameInput" />
                    <p className="input-hint" style={{marginTop: '0.8rem'}}>*Tên của bạn sẽ được khắc 3D tinh xảo lên đế đèn (Tối đa 15 ký tự)</p>

                    <div style={{marginTop: '3rem', width: '100%'}}>
                        <h4 className="color-picker-title">Chọn màu vỏ đèn</h4>
                        <div className="color-picker-list">
                            {LAMP_COLORS.map(c => (
                                <div 
                                    key={c.name}
                                    onClick={() => setActiveColor(c)}
                                    title={c.name}
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '50%', 
                                        backgroundColor: c.bg, cursor: 'pointer',
                                        border: activeColor.name === c.name ? '3px solid #facc15' : '3px solid transparent',
                                        boxShadow: activeColor.name === c.name ? '0 0 15px rgba(250,204,21,0.5)' : '0 4px 10px rgba(0,0,0,0.5)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transform: activeColor.name === c.name ? 'scale(1.15)' : 'scale(1)'
                                    }}
                                    onMouseOver={e => { if (activeColor.name !== c.name) e.currentTarget.style.transform = 'scale(1.1)' }}
                                    onMouseOut={e => { if (activeColor.name !== c.name) e.currentTarget.style.transform = 'scale(1)' }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lamp-body-preview" style={{
                    '--base-bg': activeColor.bg,
                    '--base-text': activeColor.text,
                    '--base-shadow': activeColor.shadow,
                    '--base-highlight': activeColor.highlight
                }}>
                    {/* SVG for text along arc */}
                    <svg className="arc-text-container" viewBox="0 0 300 300">
                        {/* Define the path for the text to follow (top arc) */}
                        <path id="textPathCurve" d="M 50 150 A 100 100 0 0 1 250 150" fill="transparent" />
                        
                        {/* Highlight (top left shadow for embossing) */}
                        <text className="arc-text-highlight" dy="-1" dx="-1">
                            <textPath href="#textPathCurve" startOffset="50%" textAnchor="middle">
                                {name.toUpperCase() || ''}
                            </textPath>
                        </text>
                        {/* Shadow (bottom right shadow for embossing) */}
                        <text className="arc-text-shadow" dy="2" dx="2">
                            <textPath href="#textPathCurve" startOffset="50%" textAnchor="middle">
                                {name.toUpperCase() || ''}
                            </textPath>
                        </text>
                        {/* Main text */}
                        <text className="arc-text-main">
                            <textPath href="#textPathCurve" startOffset="50%" textAnchor="middle">
                                {name.toUpperCase() || ''}
                            </textPath>
                        </text>
                    </svg>

                    <div className="center-logo-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2}}>
                        {/* Fake Heart Logo to mimic the photo/user request */}
                        <div className="embossed-text" style={{fontSize: '3rem', marginBottom: '10px'}}>❤</div>
                        <div className="embossed-text" style={{fontSize: '1.2rem', letterSpacing: '4px'}}>LUMILIGHT</div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};
