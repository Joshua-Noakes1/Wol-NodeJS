require('dotenv').config();

const verifyAuth = (req, res, next) => {
    const apiKey = req.query.apiKey || req.body.apiKey || req.query.password || req.body.password;

    if (!apiKey) {
        return res.status(401).json({
            success: "false",
            "message": "Unauthorized",
        });
    }

    if (apiKey !== process.env.apiKey) {
        return res.status(401).json({
            success: "false",
            "message": "Unauthorized",
        });
    }

    return next();
};

module.exports = verifyAuth;