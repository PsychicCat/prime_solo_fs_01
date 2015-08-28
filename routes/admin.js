var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/admin', function(req, res, next) {
    var query = req.query;
    if(query.key == "APIKEY"){
        res.sendFile(path.join(__dirname, '../views/admin.html'));
    } else {
        res.send("Sorry, you do not have access to this page.");
    }
});

module.exports = router;
