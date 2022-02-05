const verifyAuth = (req, res, next) => {
    const apiKey = req.query.apiKey || req.body.apiKey || req.headers['x-api-key'];

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