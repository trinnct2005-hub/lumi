class LampConfig {
    constructor(cct, lux, name) {
        // Encapsulation (Che giấu dữ liệu)
        this._cct = cct;
        this._lux = lux;
        this._name = name;
    }

    // Getters
    getCct() { return this._cct; }
    getLux() { return this._lux; }
    getName() { return this._name; }

    // Setters với validation
    setCct(value) {
        if (value >= 2700 && value <= 6500) {
            this._cct = value;
        } else {
            throw new Error("CCT must be between 2700 and 6500");
        }
    }

    setLux(value) {
        if (value >= 10 && value <= 100) {
            this._lux = value;
        } else {
            throw new Error("Lux must be between 10 and 100");
        }
    }

    setName(value) {
        if (value.length <= 15) {
            this._name = value;
        } else {
            throw new Error("Name must be less than or equal to 15 characters");
        }
    }

    // Method để trả về JSON
    toJSON() {
        return {
            cct: this._cct,
            lux: this._lux,
            name: this._name
        };
    }
}

module.exports = LampConfig;
