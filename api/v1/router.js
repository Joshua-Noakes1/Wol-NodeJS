const lcl = require('cli-color'),
    wol = require('./wol/wakeOnLan'),
    verifyAuth = require('../middleware/verifyAuth'),
    express = require('express');

// global express router
const router = express.Router();

router.get('/', async function (req, res) {
    return res.redirect(307, 'https://github.com/joshua-noakes1/wol-nodejs');
});

router.post('/wol', verifyAuth, async function (req, res) {
    // check if macAddress is present
    if (!req.body.macAddress) {
        console.log(lcl.red("[WOL - Error]"), "Missing MacAddress");
        return res.status(400).json({
            success: "false",
            "message": "Missing MacAddress"
        });
    };

    // MacAddress Regex
    if (!req.body.macAddress.toString().match(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/g)) {
        console.log(lcl.red("[WOL - Error]"), "Incorrect MacAddress Format");
        return res.status(400).json({
            success: "false",
            "message": "Incorrect Mac Address Format | Mac Address must be in format \"01:23:45:67:89:AB\""
        });
    }

    // sending wol
    if (!await wol(req.body.macAddress.toString())) {
        return res.status(500).json({
            success: "false",
            "message": `Failed to send WOL packet to "${req.body.macAddress}"`
        })
    }

    // return 200
    return res.status(200).json({
        success: "true",
        "message": `Sent WOL packet to "${req.body.macAddress}"`
    });
});

module.exports = router;