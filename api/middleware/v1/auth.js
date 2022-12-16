require('dotenv').config();

const verifyAuth = (req, res, next) => {
    const apiKey = req.query.apiKey || req.body.apiKey || req.query.password || req.body.password;

    if (!apiKey) {
        console.log(lcl.red("[Auth - Error]"), "Failed to provide API Key");
        return res.status(401).json({
            "success": "false",
            "message": "❌ Unauthorized ❌",
        });
    }

    if (apiKey !== process.env.KEY) {
        console.log(lcl.red("[Auth - Error]"), "Failed to provide correct API Key");
        return res.status(401).json({
            "success": "false",
            "message": "❌ Unauthorized ❌",
        });
    }

    return next();
};

module.exports = verifyAuth;