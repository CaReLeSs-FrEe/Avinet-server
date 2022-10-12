const express = require('express');
const router = express.Router();

router.post('/projects', (req, res, next) => {
    res.json({message: 'lets get dirty'});
});

router.get('/projects', (req, res, next) => {
    res.json({message: 'GET dirty worked!'})
});
module.exports = router;