const verifyAuth = require('../middleware/verifyAuth'),
express = require('express');

// global express router
const router = express.Router();

router.get('/', async function (req, res) {
    return res.redirect(307, 'https://github.com/joshua-noakes1/wol-nodejs');
});

router.post('/wol', verifyAuth, async function (req, res) {

});

module.exports = router;