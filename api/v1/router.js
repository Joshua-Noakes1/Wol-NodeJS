const authModule = require('../middleware/v1/auth');
const lcl = require('cli-color');
const wol = require('wol');
const express = require('express');
// global express router
const router = express.Router();

// v1 
router.get('/', function (req, res) {
    return res.redirect(307, 'https://github.com/joshua-noakes1/Wol-NodeJS');
});

// Wake
router.post('/wol', authModule, async function (req, res) {
    // check for mac address
    if (!req.body.mac) {
        console.log(lcl.red("[Express - Error]"), "No mac address provided");
        return res.status(400).json({
            "success": false,
            "message": "❌ Missing MacAddress ❌",
        });
    }

    // check for mac regex
    if (!req.body.mac.match(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)) {
        console.log(lcl.red("[Express - Error]"), "Invalid mac address provided");
        return res.status(400).json({
            "success": false,
            "message": "❌ Incorrect Mac Address Format | Mac Address must be in format \"01:23:45:67:89:AB\" ❌",
        });
    }
    
    try {
        await wol.wake(req.body.mac);
        console.log(lcl.blue("[Express - Info]"), "Woke", lcl.yellow(req.body.mac));
        return res.status(200).json({
            "success": true,
            "message": `✔️ Sent WOL packet to "${req.body.mac}" ✔️`,
        });
    } catch(err) {
        console.log(lcl.red("[Express - Error]"), err.message);
        console.log(lcl.red("[Express - Error]"), err.stack);
        return res.status(500).json({
            "success": false,
            "message": "❌ Internal server error ❌",
        });
    }
});

module.exports = router;
