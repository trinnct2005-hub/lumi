window.Hero = function Hero() {
    return (
        <header className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Ánh sáng <span>thông minh</span><br/>Cho thế hệ <span>dẫn đầu</span></h1>
                <p className="hero-subtitle">Tối ưu hiệu suất học tập, bảo vệ giấc ngủ và thể hiện chất riêng với LumiLight.</p>
                <a href="#hcl" className="cta-button">Khám phá ngay</a>
            </div>
            <div className="hero-visual">
                <div className="lamp-abstract">
                    <div className="lamp-head">
                        <div className="light-beam"></div>
                    </div>
                    <div className="lamp-body-abstract">
                        <img src="assets/logo.jpg" alt="Logo on lamp" className="hero-lamp-logo" />
                    </div>
                </div>
            </div>
        </header>
    );
};
