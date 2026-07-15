import React from 'react';

export default function AboutProject() {
    return (
        <section id="about" className="section about-section" style={{ padding: '6rem 2rem', background: '#020408' }}>
            <div className="glass-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>
                
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Tổng quan Dự án <span>LumiLight</span></h2>
                <div style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    FPT University (Cần Thơ) | Khởi Nghiệp EXE101 - Summer 2026
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ color: '#facc15', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>🎯</span> Bối cảnh & Nỗi đau
                        </h3>
                        <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.95rem' }}>
                            Sinh viên IT và thiết kế thường xuyên phải chạy deadline muộn. Sử dụng đèn ánh sáng xanh cường độ cao gây ức chế Melatonin (gây mất ngủ) và mỏi mắt. Hơn nữa, bàn học ở trọ thường rất chật hẹp, không đủ chỗ cho nhiều thiết bị rời rạc (đồng hồ, nhiệt kế).
                        </p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ color: '#34d399', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>💡</span> Giải pháp Đột phá
                        </h3>
                        <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.95rem' }}>
                            LumiLight không chỉ là đèn bàn, mà là một <strong>"Trạm học tập All-in-One"</strong>. Hệ thống IoT tự động mô phỏng nhịp sinh học (HCL), kết hợp màn hình TFT theo dõi thông tin ngay trên đế đèn, giúp tiết kiệm tối đa không gian bàn học.
                        </p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ color: '#38bdf8', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>🏆</span> Tầm nhìn Dự án
                        </h3>
                        <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.95rem' }}>
                            Tiên phong mang công nghệ Human-Centric Lighting cao cấp đến phân khúc sinh viên với mức giá sinh viên nhất (Tối ưu thiết kế vỏ In 3D PETG). Hướng tới việc bảo vệ thị lực và cải thiện giấc ngủ cho thế hệ Gen Z.
                        </p>
                    </div>
                </div>
                
                <div style={{ marginTop: '3rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                        <strong style={{ color: '#38bdf8' }}>Giảng viên hướng dẫn:</strong> <span style={{ color: '#f8fafc' }}>Thầy Võ Lê Duy</span>
                    </div>
                    <div style={{ background: 'rgba(250, 204, 21, 0.1)', padding: '0.8rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
                        <strong style={{ color: '#facc15' }}>Nhóm thực hiện:</strong> <span style={{ color: '#f8fafc' }}>Group 03 - Lớp EXE101_G05_SU26</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
