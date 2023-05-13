const express = require('express');
const router = express.Router();
const fs = require('fs');


// GET products listing
router.get('/', function(req, res, next) {
    fs.readFile("./data/noRatingProducts.json", "utf8", (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            const products = JSON.parse(data);
            res.json(products);
        }
    });
});

module.exports = router;