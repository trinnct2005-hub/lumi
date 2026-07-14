const LampConfig = require('../models/LampConfig');

class ConfigController {
    constructor() {
        // Khởi tạo một model mặc định để demo
        this.lampConfig = new LampConfig(4000, 100, "LUMILIGHT");
    }

    // [GET] /api/config
    getConfig(req, res) {
        try {
            res.json({
                success: true,
                data: this.lampConfig.toJSON()
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // [POST] /api/config
    updateConfig(req, res) {
        try {
            const data = req.body;
            // Cập nhật thông qua model (OOP)
            if (data.cct !== undefined) this.lampConfig.setCct(data.cct);
            if (data.lux !== undefined) this.lampConfig.setLux(data.lux);
            if (data.name !== undefined) this.lampConfig.setName(data.name);

            res.json({
                success: true,
                message: "Config updated successfully",
                data: this.lampConfig.toJSON()
            });
        } catch (error) {
            res.status(400).json({ error: 'Invalid JSON payload' });
        }
    }
}

module.exports = ConfigController;
