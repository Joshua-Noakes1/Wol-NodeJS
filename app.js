//loading express and morgan
const http = require('http');
require('dotenv').config()
const port = process.env.port || 3001;
const express = require('express');
const app = express();
const server = http.createServer(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const wol = require('wol');

server.listen(port);
console.log(`🚀 Started server on port ${port} 🚀`);

// Console log of anything hitting our server 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST');
    }
    next();
});

app.post('/wol', (req, res) => {
    // TODO: Add post password protection
    if (req.body.pass != process.env.password) {
        res.status(404).json({
            error: {
                message: "Incorrect Mac Address Format | Mac Address must be in format \"01:23:45:67:89:AB\""
            }
        });
        return;
    }

    // if no mac address was sent
    if (!req.body.mac) {
        res.status(404).json({
            error: {
                message: "Missing Mac Address"
            }
        });
        return;
    }

    // chceking to see if its a good mac address
    if (!req.body.mac.toString().match(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/g)) {
        res.status(404).json({
            error: {
                message: "Incorrect Mac Address Format | Mac Address must be in format \"01:23:45:67:89:AB\""
            }
        });
        return;
    }

    wol.wake(`${req.body.mac}`, function (err, res) {
        if (err) {
            res.status(500).json({
                error: "WakeOnLan Error",
                message: error
            });
            return;
        }
    });

    res.status(200).json({
        message: `Sent WOL request to ${req.body.mac}`
    });
});

// Errrors 
// Handle 404 not found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
// Handle anything else thats not a 404 not found
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});