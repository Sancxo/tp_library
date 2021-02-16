//route test

const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Books list :');
});

module.exports = router;