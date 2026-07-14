export default function Hero() {
    return (
        <header className="hero">
            {/* Shooting Stars */}
            <div className="shooting-stars">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
            </div>

            <div className="hero-grid"></div>

            <div className="hero-content">
                <h1 className="hero-title">Ánh sáng <span>thông minh</span><br/>Cho thế hệ <span>dẫn đầu</span></h1>
                <p className="hero-subtitle">Tối ưu hiệu suất học tập, bảo vệ giấc ngủ và thể hiện chất riêng với LumiLight.</p>
                <a href="#hcl" className="cta-button">Khám phá ngay</a>
            </div>
            
            <div className="hero-visual">
                {/* Floating Badges */}
                <div className="floating-badge badge-1">
                    <span className="badge-icon">💡</span>
                    <div>
                        <strong>Công nghệ HCL</strong>
                        <p>Bảo vệ nhịp sinh học</p>
                    </div>
                </div>
                
                <div className="floating-badge badge-2">
                    <span className="badge-icon">✨</span>
                    <div>
                        <strong>Thiết kế gập 3D</strong>
                        <p>Góc chiếu sáng tối ưu</p>
                    </div>
                </div>

                <div className="floating-badge badge-3">
                    <span className="badge-icon">🎨</span>
                    <div>
                        <strong>Khắc 3D theo yêu cầu</strong>
                        <p>Độc bản mang dấu ấn riêng</p>
                    </div>
                </div>

                <div className="lamp-abstract">
                    <div className="lamp-base">
                        <img src="/logo.png" alt="Logo on lamp" className="hero-lamp-logo" />
                    </div>
                    <div className="lamp-stem-lower"></div>
                    <div className="lamp-hinge"></div>
                    <div className="lamp-stem-upper"></div>
                    <div className="lamp-head"></div>
                    <div className="light-beam"></div>
                </div>
            </div>
        </header>
    );
};
