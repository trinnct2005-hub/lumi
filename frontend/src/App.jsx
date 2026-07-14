import Hero from './components/Hero.jsx';
import LightSimulator from './components/LightSimulator.jsx';
import Personalization from './components/Personalization.jsx';
import SmartBase from './components/SmartBase.jsx';
import ComparisonTable from './components/ComparisonTable.jsx';
import TeamMembers from './components/TeamMembers.jsx';

export default function App() {
    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <img src="assets/logo.jpg" alt="LumiLight Logo" className="nav-logo" />
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
                            <img src="assets/logo.jpg" alt="LumiLight Logo" />
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