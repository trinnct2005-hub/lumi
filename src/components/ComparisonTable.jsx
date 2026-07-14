export default function ComparisonTable() {
    return (
        <section id="compare" className="section comparison-section">
            <h2 className="section-title">Vì sao chọn LumiLight?</h2>
            
            <div className="table-container">
                <table className="compare-table">
                    <thead>
                        <tr>
                            <th>Tính năng</th>
                            <th className="highlight-col">LumiLight (Sinh viên)</th>
                            <th>Xiaomi (Phổ thông)</th>
                            <th>Baseus (Văn phòng)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Công nghệ ánh sáng</td>
                            <td className="highlight-col">HCL (Bảo vệ nhịp sinh học)</td>
                            <td>LED thường (Chỉnh thủ công)</td>
                            <td>LED thường (Cảm biến cơ bản)</td>
                        </tr>
                        <tr>
                            <td>Cá nhân hóa</td>
                            <td className="highlight-col">In 3D khắc tên (Miễn phí)</td>
                            <td>Không có</td>
                            <td>Không có</td>
                        </tr>
                        <tr>
                            <td>Tiện ích tích hợp</td>
                            <td className="highlight-col">Màn hình TFT (Đồng hồ, Nhiệt độ)</td>
                            <td>Không có màn hình</td>
                            <td>Chỉ có báo thức cơ bản</td>
                        </tr>
                        <tr>
                            <td>Tối ưu không gian</td>
                            <td className="highlight-col">All-in-one cao</td>
                            <td>Trung bình</td>
                            <td>Thấp (Đèn kẹp màn hình)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};
