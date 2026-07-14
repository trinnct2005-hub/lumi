export default function TeamMembers() {
    const team = [
        { name: "Nguyễn Như Trí", role: "CTO", desc: "Responsible for product technology and hardware development." },
        { name: "Quach Ngoc Bang Nghi", role: "CMO", desc: "Responsible for marketing and brand communication." },
        { name: "Nguyen Huy Hoang", role: "CFO", desc: "Responsible for project finance and budget management." },
        { name: "Tran Thi Ngoc Xuan", role: "CSO", desc: "Responsible for sales operations and customer relations." },
        { name: "Pham Hoang Phuong", role: "CIO", desc: "Responsible for software development and system technology." }
    ];

    return (
        <section id="team" className="section team-section">
            <h2 className="section-title">Đội ngũ <span>LumiLight</span></h2>
            <p className="section-desc">Những thành viên nòng cốt điều hành và phát triển dự án LumiLight.</p>
            
            <div className="org-chart">
                <div className="org-ceo">
                    <div className="team-card ceo-card glass-container">
                        <h3>Nguyen Tran Nhu Y</h3>
                        <div className="role">CEO</div>
                        <p>Manage and coordinate the entire project.</p>
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
