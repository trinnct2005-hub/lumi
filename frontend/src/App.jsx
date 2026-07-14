import Hero from './components/Hero.jsx';
import LightSimulator from './components/LightSimulator.jsx';
import Personalization from './components/Personalization.jsx';
import SmartBase from './components/SmartBase.jsx';
import ComparisonTable from './components/ComparisonTable.jsx';
import TeamMembers from './components/TeamMembers.jsx';
import { useState, useEffect } from 'react';

export default function App() {
    const [showPopup, setShowPopup] = useState(false);
    const [dragonState, setDragonState] = useState({
        flying: false,
        top: '20%',
        key: 0
    });

    const getRandomEdgeTop = () => {
        const isTopEdge = Math.random() > 0.5;
        if (isTopEdge) {
            return Math.floor(Math.random() * 10 + 5) + '%'; // 5% to 15%
        } else {
            return Math.floor(Math.random() * 10 + 80) + '%'; // 80% to 90%
        }
    };

    useEffect(() => {
        // Initial flight after 20 seconds
        const timer = setTimeout(() => {
            setDragonState(prev => ({
                flying: true,
                top: getRandomEdgeTop(),
                key: prev.key + 1
            }));
        }, 20000);
        return () => clearTimeout(timer);
    }, []);

    const catchDragon = () => {
        if (!dragonState.flying) return;
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleFlightEnd = () => {
        // Hide dragon
        setDragonState(prev => ({ ...prev, flying: false }));
        
        // Schedule next random flight after exactly 20 seconds
        setTimeout(() => {
            setDragonState(prev => ({
                flying: true,
                top: getRandomEdgeTop(),
                key: prev.key + 1
            }));
        }, 20000);
    };

    return (
        <div>
            {/* Global Aurora Background */}
            <div className="aurora-bg">
                <div className="aurora-blob aurora-1"></div>
                <div className="aurora-blob aurora-2"></div>
                <div className="aurora-blob aurora-3"></div>
                <div className="aurora-blob aurora-4"></div>
            </div>

            {/* Flying Dragon */}
            <div 
                key={dragonState.key}
                className={`flying-dragon ${dragonState.flying ? 'dragon-animate' : 'dragon-hidden'} ${showPopup ? 'paused' : ''}`} 
                onClick={catchDragon}
                onAnimationEnd={handleFlightEnd}
                style={{ top: dragonState.top }}
            >
                <span className="dragon-body">🐉</span>
            </div>

            {/* Voucher Popup */}
            {showPopup && (
                <div className="dragon-popup-overlay" onClick={closePopup}>
                    <div className="dragon-popup-content" onClick={e => e.stopPropagation()}>
                        <button className="popup-close" onClick={closePopup}>&times;</button>
                        
                        <div className="popup-dragon-display">
                            <span className="popup-dragon">🐉</span>
                        </div>

                        <h2 className="popup-title">Chúc mừng!</h2>
                        <p className="popup-subtitle">Bạn đã bắt được Rồng Thần Lumi!</p>
                        <div className="voucher-box">
                            <span className="voucher-code">LUMI-DRAGON10</span>
                            <span className="voucher-desc">Giảm ngay 10% khi đặt trước LumiLight</span>
                        </div>
                        <a href="#hcl" className="cta-button popup-buy-btn" onClick={closePopup}>Nhận ưu đãi ngay</a>
                    </div>
                </div>
            )}

            <nav className="navbar">
                <div className="logo-container">
                    <img src="/logo.png" alt="LumiLight Logo" className="nav-logo" />
                    <span className="nav-brand">LUMILIGHT</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#hcl">HCL Tech</a></li>
                    <li><a href="#personalize">Cá nhân hóa</a></li>
                    <li><a href="#smartbase">Smart Base</a></li>
                    <li><a href="#compare">So sánh</a></li>
                    <li><a href="#team">Đội ngũ</a></li>
                </ul>
            </nav>

            <Hero />
            <LightSimulator />
            <Personalization />
            <SmartBase />
            <ComparisonTable />
            <TeamMembers />

            <footer>
                <div className="footer-grid">
                    <div className="footer-col">
                        <div className="logo-container footer-logo">
                            <img src="/logo.png" alt="LumiLight Logo" />
                            <span>LUMILIGHT</span>
                        </div>
                        <h3 style={{ display: 'none' }}>Giới thiệu</h3>
                        <p>Lumi cung cấp thiết bị hỗ trợ chuyên nghiệp, đáp ứng mọi nhu cầu và mong muốn của khách hàng. Hỗ trợ tuyệt đối với hệ thống trang thiết bị hiện đại, đội ngũ kỹ thuật viên giàu kinh nghiệm, đảm bảo chất lượng và trải nghiệm của khách hàng.</p>
                    </div>
                    
                    <div className="footer-col">
                        <h3>Giờ làm việc</h3>
                        <p>Giờ làm việc của công ty chúng tôi:</p>
                        <ul>
                            <li>Thứ Hai - Thứ Sáu: 9:00AM - 6:00PM</li>
                            <li>Thứ 7 - Chủ Nhật: 8:00AM - 4:00PM</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Thông tin liên hệ</h3>
                        <ul>
                            <li>📍 600 Nguyen Van Cu street, Ninh Kieu ward, Can Tho city.</li>
                            <li>📧 lumilight.cantho@gmail.com</li>
                            <li>📞 0767064904</li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>© Bản quyền nội dung thuộc về LumiLight</p>
                </div>
            </footer>
        </div>
    );
};