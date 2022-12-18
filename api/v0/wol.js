const authModule = require('../middleware/v1/auth');
const lcl = require('cli-color');
const wol = require('wol');
const ping = require('ping');
const express = require('express');
const e = require('express');
// global express router
const router = express.Router();

// Wake
router.post('/', authModule, async function (req, res) {
    var {
        macAddress
    } = req.body;

    // if mac address is not in body check query
    if (!macAddress) {
        macAddress = req.query.macAddress;
    }

    // check for mac address
    if (!macAddress) {
        console.log(lcl.red("[Express - Error]"), "No mac address provided");
        return res.status(400).json({
            "success": false,
            "message": "❌ Missing MacAddress ❌",
        });
    }

    // check for mac regex
    if (!macAddress.match(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)) {
        console.log(lcl.red("[Express - Error]"), "Invalid mac address provided");
        return res.status(400).json({
            "success": false,
            "message": "❌ Incorrect Mac Address Format | Mac Address must be in format \"01:23:45:67:89:AB\" ❌",
        });
    }

    try {
        await wol.wake(macAddress);
        console.log(lcl.blue("[Express - Info]"), "Woke", lcl.yellow(macAddress));
        return res.status(200).json({
            "success": true,
            "message": `✔️ Sent WOL packet to "${macAddress}" ✔️`
        });
    } catch (err) {
        console.log(lcl.red("[Express - Error]"), err.message);
        console.log(lcl.red("[Express - Error]"), err.stack);
        return res.status(500).json({
            "success": false,
            "message": "Internal server error",
        });
    }
}).get('/', async function (req, res) {
    var {
        ha,
        ipAddr
    } = req.query;

    var resStatus = ha == "hassio" ? 200 : 404;

    // send a ping req to the ip addr
    try {
        if (ipAddr) {
            console.log(lcl.blue("[Ping - Info]"), "Pinging", lcl.yellow(ipAddr));
            var host = await ping.promise.probe(ipAddr);
            if (host.alive) {
                console.log(lcl.green("[Ping - Success]"), `${lcl.yellow(ipAddr)} is alive`);
                return res.status(resStatus).json({
                    "success": true,
                    "message": "Host is alive",
                });
            } else {
                console.log(lcl.red("[Ping - Error]"), `${lcl.yellow(ipAddr)} is not alive`);
                return res.status(resStatus).json({
                    "success": false,
                    "message": "Host is not alive",
                });
            }
        } else {
            return res.status(resStatus).json({
                "success": true,
                "message": "Hello World!", // This is a fix for home assistant reporting back that the URL is not-ok when it is
            });
        }
    } catch (err) {
        console.log(lcl.red("[Ping - Error]"), err.message);
        console.log(lcl.red("[Ping - Error]"), err.stack);
        return res.status(500).json({
            "success": false,
            "message": "Internal server error",
        });
    }
});

module.exports = router;