const express = require('express');
// global express router
const router = express.Router();

// v1 
router.get('/', function (req, res) {
    return res.redirect(307, 'https://github.com/joshua-noakes1/ExpressJS-Template');
});

module.exports = router;