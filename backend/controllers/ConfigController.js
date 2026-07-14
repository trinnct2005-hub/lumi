const LampConfig = require('../models/LampConfig');

class ConfigController {
    constructor() {
        // Khởi tạo một model mặc định để demo
        this.lampConfig = new LampConfig(4000, 100, "LUMILIGHT");
    }

    // [GET] /api/config
    getConfig(req, res) {
        try {
            res.writeHead(200);
            res.end(JSON.stringify({
                success: true,
                data: this.lampConfig.toJSON()
            }));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }

    // [POST] /api/config
    updateConfig(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                // Cập nhật thông qua model (OOP)
                if (data.cct !== undefined) this.lampConfig.setCct(data.cct);
                if (data.lux !== undefined) this.lampConfig.setLux(data.lux);
                if (data.name !== undefined) this.lampConfig.setName(data.name);

                res.writeHead(200);
                res.end(JSON.stringify({
                    success: true,
                    message: "Config updated successfully",
                    data: this.lampConfig.toJSON()
                }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
            }
        });
    }
}

module.exports = ConfigController;
