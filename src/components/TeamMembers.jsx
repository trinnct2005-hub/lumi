export default function TeamMembers() {
    const team = [
        { name: "Nguyễn Như Trí", role: "CTO", desc: "Phát triển công nghệ và phần cứng (Cảm biến, Ánh sáng sinh học)." },
        { name: "Quách Ngọc Băng Nghi", role: "CMO", desc: "Nghiên cứu thị trường và quản trị truyền thông thương hiệu." },
        { name: "Nguyễn Huy Hoàng", role: "CFO", desc: "Quản lý tài chính, ngân sách và phân tích chi phí sản xuất." },
        { name: "Trần Thị Ngọc Xuân", role: "CSO", desc: "Chiến lược kinh doanh, bán hàng và chăm sóc khách hàng." },
        { name: "Phạm Hoàng Phương", role: "CIO", desc: "Phát triển phần mềm, ứng dụng quản lý và hệ thống hiển thị TFT." }
    ];

    return (
        <section id="team" className="section team-section">
            <h2 className="section-title">Đội ngũ <span>LumiLight</span></h2>
            <p className="section-desc">Những thành viên nòng cốt điều hành và phát triển dự án Startup LumiLight.</p>
            
            <div className="org-chart">
                <div className="org-ceo">
                    <div className="team-card ceo-card glass-container">
                        <h3>Nguyễn Trần Như Ý</h3>
                        <div className="role">CEO</div>
                        <p>Giám đốc điều hành, phụ trách chiến lược phát triển và điều phối toàn bộ dự án.</p>
                    </div>
                </div>
                
                <div className="org-line-vertical"></div>
                <div className="org-line-horizontal"></div>
                
                <div className="org-members">
                    {team.map((member, idx) => (
                        <div className="org-member-wrap" key={idx}>
                            <div className="org-line-branch"></div>
                            <div className="team-card glass-container">
                                <h3>{member.name}</h3>
                                <div className="role">{member.role}</div>
                                <p>{member.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
