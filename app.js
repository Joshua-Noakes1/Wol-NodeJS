// App config
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');
const favicon = require('serve-favicon');

// Express dev
app.use(morgan("dev"));

// favicon
app.use(favicon(path.join(__dirname, 'public', 'static', 'favicon.ico')))

// register ejs
app.set('view engine', 'ejs');
app.set('views', 'public');

// Express bodyparser
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

// Modules
const wol = require('./lib/wol/wakeOnLan');
const check = require('./lib/wol/checkIP');

// Endpoints
app.use('/wol', wol);
app.use('/check', check);

// Status endpoint
app.get("/status", (req, res) => {
    res.status(200).json({
        "success": "true",
        "message": "🚀 The rocket has launched 🚀",
    });
});

// Express error handling 
app.use((req, res, next) => {
    const error = new Error("❌ Page Not Found ❌")
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        "success": "false",
        "error": {
            "code": error.status || 500,
            "message": error.message,
        }
    });
});

module.exports = app;