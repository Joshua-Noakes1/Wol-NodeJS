const express = require('express');
const router = express.Router();
const wol = require('wol');
const ping = require('./ping');

router.post('/', (req, res) => {
    (async () => {
        // TODO: Add post password protection
        if (req.body.pass != process.env.password || process.env.password == undefined) {
            // 401 Unauthorized - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
            res.status(401).json({
                "success": "fail",
                "error": {
                    "message": "Incorrect Password"
                }
            });
            return;
        }

        // if no mac address was sent
        if (!req.body.mac) {
            // 404 Not Found - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
            res.status(404).json({
                "success": "fail",
                "error": {
                    "message": "Missing Mac Address"
                }
            });
            return;
        }

        // chceking to see if its a good mac address
        if (!req.body.mac.toString().match(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/g)) {
            // 409 Conflict - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
            res.status(409).json({
                "success": "fail",
                "error": {
                    "message": "Incorrect Mac Address Format | Mac Address must be in format \"01:23:45:67:89:AB\""
                }
            });
            return;
        }

        // send wol request 
        wol.wake(`${req.body.mac}`, function (error, res) {
            // error 500 for wol not working
            if (error) {
                // 500 Internal Server Error - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
                res.status(500).json({
                    "success": "fail",
                    "error": {
                        "message": `WOL: ${error}`
                    }
                });
                return;
            }
        });

        // check using ping to see if the client is alive 
        if (req.body.check == 'true') {
            // ping client 
            var response = await ping.ping(req.body.ip);
            // client dead
            if (response != true) {
                // 408 Request Timeout - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408
                res.status(408).json({
                    "success": "fail",
                    "error": {
                        "message": `Un-Successfuly sent WOL request to ${req.body.ip || "0.0.0.0"} (${req.body.mac})`
                    }
                })
                return;
            }
            // client alive
            // 200 OK - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
            res.status(200).json({
                "success": "true",
                "message": `Successfuly sent WOL request to ${req.body.ip} (${req.body.mac})`
            });
            return;
        }

        // response if no check
        // 200 OK - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
        res.status(200).json({
            "success": "true",
            "message": `Sent WOL request to ${req.body.mac}`
        });
    })();
});

module.exports = router;