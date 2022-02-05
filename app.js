const lcl = require('cli-color'),
    compression = require('compression'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require("body-parser"),
    favicon = require('serve-favicon')
express = require('express');

// const global app object
const app = express();

// express middlewares
app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(favicon(path.join(__dirname, 'public', 'static', 'favicon.ico')));

// routes
app.use('/api', require('./api/router'));

// 404 - Page Not Found
app.use((req, res, next) => {
    const error = new Error("❌ Page Not Found ❌")
    error.status = 404;
    next(error);
});

// 500 - Internal Server Error
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        "success": "false",
        "error": {
            "code": error.status || 500,
            "message": error.message,
        }
    });
});

// Start the server
const port = process.env.port || 3000;
app.listen(port, async function () {
    console.log(lcl.blue("[Info]"), "Server started on port", lcl.yellow(port));
});