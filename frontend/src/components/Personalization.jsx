import { useState, useRef } from 'react';
export default function Personalization() {
    const [name, setName] = useState('');
    const typingTimer = useRef(null);

    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);

        clearTimeout(typingTimer.current);
        typingTimer.current = setTimeout(() => {
            fetch('http://localhost:3000/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: val || 'LUMILIGHT' })
            }).catch(err => console.log("Failed to sync name"));
        }, 1000);
    };

    return (
        <section id="personalize" className="section personalize-section">
            <h2 className="section-title">Zero-Cost Personalization</h2>
            <p className="section-desc">Công nghệ in 3D PETG cho phép khắc tên cá nhân hóa hoàn toàn miễn phí. Độc bản như chính bạn.</p>
            
            <div className="glass-container">
                <div className="personalize-container">
                <div className="input-area">
                    <input type="text" placeholder="Nhập tên của bạn..." maxLength="15" autoComplete="off" 
                        value={name} onChange={handleNameChange} id="nameInput" />
                    <p className="input-hint">*Tối đa 15 ký tự (Dữ liệu sẽ được lưu qua BE)</p>
                </div>
                <div className="lamp-body-preview">
                    <div className="embossed-text">
                        {name.toUpperCase() || 'LUMILIGHT'}
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
