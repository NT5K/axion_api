const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = router;

// display circulating supply only endpoint 
router.get('/circulating', (__, res) => {
    res.sendFile(path.join(__dirname, '/../public/html/index.html'));
});
// main selection
router.get('/', (__, res) => {
    res.sendFile(path.join(__dirname, '/../public/html/main.html'));
});