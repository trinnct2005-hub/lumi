import { useState, useRef } from 'react';

const LAMP_COLORS = [
    { name: 'Trắng Ngọc (Pearl)', bg: '#f8fafc', text: '#f1f5f9', shadow: 'rgba(15,23,42,0.2)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Đen Nhám (Matte)', bg: '#0f172a', text: '#020617', shadow: 'rgba(0,0,0,0.9)', highlight: 'rgba(255,255,255,0.08)' },
    { name: 'Vàng Hồng (Rose Gold)', bg: '#fff1f2', text: '#ffe4e6', shadow: 'rgba(159,18,57,0.15)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Xanh Bạc Hà (Mint)', bg: '#f0fdf4', text: '#dcfce7', shadow: 'rgba(21,128,61,0.15)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Tím Khói (Lavender)', bg: '#f5f3ff', text: '#ede9fe', shadow: 'rgba(76,29,149,0.15)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Xanh Đại Dương (Ocean)', bg: '#e0f2fe', text: '#bae6fd', shadow: 'rgba(3,105,161,0.15)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Vàng Hoàng Kim (Gold)', bg: '#fefce8', text: '#fef08a', shadow: 'rgba(161,98,7,0.15)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Xanh Rêu (Olive)', bg: '#f7fee7', text: '#ecfccb', shadow: 'rgba(77,124,15,0.15)', highlight: 'rgba(255,255,255,1)' },
    { name: 'Đỏ Đô (Burgundy)', bg: '#4c0519', text: '#22000a', shadow: 'rgba(0,0,0,0.8)', highlight: 'rgba(255,255,255,0.1)' }
];

const LAMP_ICONS = ['❤\uFE0E', '☀\uFE0E', '🌙\uFE0E', '⭐\uFE0E', '☁\uFE0E', '⚡\uFE0E', '❀\uFE0E', '♫\uFE0E', '🍀\uFE0E', '🐾\uFE0E'];

export default function Personalization() {
    const [name, setName] = useState('');
    const [activeColor, setActiveColor] = useState(LAMP_COLORS[0]);
    const [activeIcon, setActiveIcon] = useState(LAMP_ICONS[0]);
    
    // Order Modal States
    const [showModal, setShowModal] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [orderForm, setOrderForm] = useState({ fullName: '', phone: '', email: '', address: '' });
    const [formErrors, setFormErrors] = useState({});
    const [orderSuccess, setOrderSuccess] = useState(false);
    
    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);
        setNameError(false);
    };

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        const { fullName, phone, email, address } = orderForm;
        let errors = {};
        
        if (!fullName.trim()) errors.fullName = 'Vui lòng nhập họ tên!';
        
        if (!phone.trim()) {
            errors.phone = 'Vui lòng nhập số điện thoại!';
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone)) {
            errors.phone = 'Số điện thoại không hợp lệ!';
        }

        if (!email.trim()) {
            errors.email = 'Vui lòng nhập email!';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Email không hợp lệ!';
        }

        if (!address.trim()) errors.address = 'Vui lòng nhập địa chỉ giao hàng!';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setOrderSuccess(true);
        // Normally an API call would happen here
        setTimeout(() => {
            setShowModal(false);
            setOrderSuccess(false);
            setOrderForm({ fullName: '', phone: '', email: '', address: '' });
            setName('');
        }, 4000);
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
                        value={name} onChange={handleNameChange} id="nameInput" style={{ border: nameError ? '2px solid #ef4444' : '' }} />
                    {nameError && <p style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 'bold'}}>Vui lòng nhập tên bạn muốn khắc!</p>}
                    <p className="input-hint" style={{marginTop: '0.8rem'}}>*Tên của bạn sẽ được khắc 3D tinh xảo lên đế đèn (Tối đa 15 ký tự)</p>

                    <div style={{marginTop: '2.5rem', width: '100%'}}>
                        <h4 className="color-picker-title" style={{fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', fontWeight: '600'}}>Chọn màu vỏ đèn</h4>
                        <div className="color-picker-list" style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
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

                    <div style={{marginTop: '2.5rem', width: '100%'}}>
                        <h4 className="color-picker-title" style={{fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', fontWeight: '600'}}>Chọn Icon khắc</h4>
                        <div className="icon-picker-list" style={{display: 'flex', gap: '0.8rem', flexWrap: 'wrap'}}>
                            {LAMP_ICONS.map(icon => (
                                <div 
                                    key={icon}
                                    onClick={() => setActiveIcon(icon)}
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '12px', 
                                        backgroundColor: 'rgba(255,255,255,0.05)', cursor: 'pointer',
                                        border: activeIcon === icon ? '2px solid #facc15' : '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.2rem', color: activeIcon === icon ? '#facc15' : '#e2e8f0',
                                        transition: 'all 0.2s',
                                        transform: activeIcon === icon ? 'scale(1.1)' : 'scale(1)',
                                        boxShadow: activeIcon === icon ? '0 0 15px rgba(250,204,21,0.2)' : 'none'
                                    }}
                                    onMouseOver={e => { if (activeIcon !== icon) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)' }}
                                    onMouseOut={e => { if (activeIcon !== icon) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
                                >
                                    {icon}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        className="cta-button" 
                        style={{marginTop: '3rem', width: '100%', padding: '1rem', fontSize: '1.1rem', background: '#facc15', color: '#000', border: 'none', fontWeight: '800'}}
                        onClick={() => {
                            if (!name.trim()) {
                                setNameError(true);
                                return;
                            }
                            setShowModal(true);
                        }}
                    >
                        ĐẶT HÀNG NGAY
                    </button>
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
                                {name ? name.toUpperCase() : 'TÊN CỦA BẠN'}
                            </textPath>
                        </text>
                        {/* Shadow (bottom right shadow for embossing) */}
                        <text className="arc-text-shadow" dy="2" dx="2">
                            <textPath href="#textPathCurve" startOffset="50%" textAnchor="middle">
                                {name ? name.toUpperCase() : 'TÊN CỦA BẠN'}
                            </textPath>
                        </text>
                        {/* Main text */}
                        <text className="arc-text-main">
                            <textPath href="#textPathCurve" startOffset="50%" textAnchor="middle">
                                {name ? name.toUpperCase() : 'TÊN CỦA BẠN'}
                            </textPath>
                        </text>
                    </svg>

                    <div className="center-logo-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2}}>
                        <div className="embossed-text" style={{fontSize: '3rem', marginBottom: '10px'}}>{activeIcon}</div>
                        <div className="embossed-text" style={{fontSize: '1.2rem', letterSpacing: '4px'}}>LUMILIGHT</div>
                    </div>
                </div>
                </div>
            </div>

            {/* Order Modal Overlay */}
            {showModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)'
                }}>
                    <div className="modal-content" style={{
                        background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
                        padding: '2.5rem', borderRadius: '24px', width: '90%', maxWidth: '450px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}>
                        {orderSuccess ? (
                            <div style={{textAlign: 'center', color: '#f8fafc', padding: '2rem 0'}}>
                                <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🎉</div>
                                <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: '#facc15'}}>Đặt Hàng Thành Công!</h3>
                                <p style={{lineHeight: 1.6, color: '#94a3b8', fontSize: '1rem'}}>
                                    Cảm ơn bạn đã lựa chọn LumiLight.<br/><br/>
                                    Đơn hàng khắc tên <strong style={{color: '#fff'}}>{name.toUpperCase()} {activeIcon.replace('\uFE0E', '')}</strong><br/>
                                    Màu sắc: <strong style={{color: '#fff'}}>{activeColor.name}</strong><br/>
                                    đã được hệ thống ghi nhận.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                                    <h3 style={{color: '#f8fafc', fontSize: '1.3rem'}}>Thông Tin Giao Hàng</h3>
                                    <button onClick={() => setShowModal(false)} style={{background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer', outline: 'none'}}>×</button>
                                </div>

                                {/* Order Summary Confirmation */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem',
                                    display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div style={{
                                        width: '50px', height: '50px', borderRadius: '50%', backgroundColor: activeColor.bg,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.3)',
                                        color: activeColor.text, fontSize: '1.2rem', textShadow: '0 0 0 rgba(0,0,0,0.1)'
                                    }}>
                                        {activeIcon.replace('\uFE0E', '')}
                                    </div>
                                    <div>
                                        <div style={{color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem'}}>Sản phẩm của bạn</div>
                                        <div style={{color: '#f8fafc', fontWeight: 'bold', fontSize: '1.1rem'}}>{name.toUpperCase()} {activeIcon.replace('\uFE0E', '')}</div>
                                        <div style={{color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.2rem'}}>Vỏ đèn: <span style={{color: '#facc15'}}>{activeColor.name}</span></div>
                                    </div>
                                </div>
                                
                                <form onSubmit={handleOrderSubmit}>
                                    <div style={{marginBottom: '1rem'}}>
                                        <label style={{display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem'}}>Họ và tên người nhận (*)</label>
                                        <input type="text" style={{width: '100%', padding: '0.8rem', borderRadius: '8px', border: formErrors.fullName ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', fontFamily: 'inherit'}} 
                                            value={orderForm.fullName} onChange={e => { setOrderForm({...orderForm, fullName: e.target.value}); setFormErrors({...formErrors, fullName: ''}) }} placeholder="VD: Nguyễn Văn A" />
                                        {formErrors.fullName && <div style={{color: '#ef4444', fontSize: '0.8rem', marginTop: '0.3rem'}}>{formErrors.fullName}</div>}
                                    </div>
                                    <div style={{marginBottom: '1rem'}}>
                                        <label style={{display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem'}}>Số điện thoại (*)</label>
                                        <input type="tel" style={{width: '100%', padding: '0.8rem', borderRadius: '8px', border: formErrors.phone ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', fontFamily: 'inherit'}} 
                                            value={orderForm.phone} 
                                            onChange={e => {
                                                const val = e.target.value.replace(/[^0-9]/g, '');
                                                setOrderForm({...orderForm, phone: val});
                                                setFormErrors({...formErrors, phone: ''});
                                            }} 
                                            placeholder="VD: 0987654321" />
                                        {formErrors.phone && <div style={{color: '#ef4444', fontSize: '0.8rem', marginTop: '0.3rem'}}>{formErrors.phone}</div>}
                                    </div>
                                    <div style={{marginBottom: '1rem'}}>
                                        <label style={{display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem'}}>Email (*)</label>
                                        <input type="email" style={{width: '100%', padding: '0.8rem', borderRadius: '8px', border: formErrors.email ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', fontFamily: 'inherit'}} 
                                            value={orderForm.email} onChange={e => { setOrderForm({...orderForm, email: e.target.value}); setFormErrors({...formErrors, email: ''}) }} placeholder="VD: email@example.com" />
                                        {formErrors.email && <div style={{color: '#ef4444', fontSize: '0.8rem', marginTop: '0.3rem'}}>{formErrors.email}</div>}
                                    </div>
                                    <div style={{marginBottom: '1.5rem'}}>
                                        <label style={{display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem'}}>Địa chỉ giao hàng (*)</label>
                                        <textarea style={{width: '100%', padding: '0.8rem', borderRadius: '8px', border: formErrors.address ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', minHeight: '80px', resize: 'vertical', outline: 'none', fontFamily: 'inherit'}} 
                                            value={orderForm.address} onChange={e => { setOrderForm({...orderForm, address: e.target.value}); setFormErrors({...formErrors, address: ''}) }} placeholder="Nhập địa chỉ nhận hàng của bạn" />
                                        {formErrors.address && <div style={{color: '#ef4444', fontSize: '0.8rem', marginTop: '0.3rem'}}>{formErrors.address}</div>}
                                    </div>
                                    
                                    <button type="submit" className="cta-button" style={{width: '100%', padding: '1rem', background: '#facc15', color: '#000', border: 'none', fontWeight: '800', borderRadius: '30px', cursor: 'pointer'}}>
                                        XÁC NHẬN ĐẶT HÀNG
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};
