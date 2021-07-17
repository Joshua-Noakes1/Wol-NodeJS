require('dotenv').config();
const express = require('express');
const router = express.Router();
const {
    wakeOnLan
} = require('../../bin/wakeOnLan');

router.post('/', async (req, res, next) => {
    // do auth check
    if (req.body.password != process.env.password) {
        const error = new Error("❌ Failed to authencate ❌");
        error.status = 401;
        next(error);
        return;
    }

    // MacAddress check
    if (!req.body.macAddress) {
        const error = new Error("❌ Missing MacAddress ❌");
        error.status = 400;
        next(error);
        return;
    }

    // MacAddress Regex check
    if (!req.body.macAddress.toString().match(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/g)) {
        const error = new Error("❌ Incorrect Mac Address Format | Mac Address must be in format \"01:23:45:67:89:AB\" ❌");
        error.status = 400;
        next(error);
        return;
    }

    // sending wol
    if (!await wakeOnLan(req.body.macAddress)) {
        const error = new Error(`❌ Failed to send WOL packet to "${req.body.macAddress}" ❌`);
        next(error);
        return;
    };

    // return 200
    return res.status(200).json({
        "success": true,
        "message": `✔️ Sent WOL packet to "${req.body.macAddress}" ✔️`
    });
});

module.exports = router