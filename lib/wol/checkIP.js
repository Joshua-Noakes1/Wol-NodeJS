require('dotenv').config();
const express = require('express');
const router = express.Router();
const {
    checkIP
} = require('../../bin/checkIP');

router.post('/', async (req, res, next) => {
    // do auth check
    if (req.body.password != process.env.password) {
        const error = new Error("❌ Failed to authencate ❌");
        error.status = 401;
        next(error);
        return;
    }

    // check if ipaddress exists
    if (req.body.ipAddress == undefined || req.body.ipAddress == '') {
        const error = new Error(`❌ Missing IP Address ❌`);
        error.status = 400;
        next(error);
        return;
    }

    // ipAddress Regex check
    if (!req.body.ipAddress.toString().match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/g)) {
        const error = new Error("❌ Incorrect IP Address Address Format | IP Address must be in format \"192.168.10.1\" ❌");
        error.status = 400;
        next(error);
        return;
    }

    // do ipcheck
    if (!await checkIP(req.body.ipAddress)) {
        const error = new Error(`❌ Client "${req.body.ipAddress}" is not Alive! ❌`);
        error.status = 404;
        next(error);
        return;
    };

    return res.status(200).json({
        "success": true,
        "message": `✔️ Client "${req.body.ipAddress}" is Alive! ✔️`
    });
});

module.exports = router