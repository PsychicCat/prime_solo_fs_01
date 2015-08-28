var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET customers list */
router.get('/:id?', function(req,res,next){
    var id = req.params.id;

    var file = path.join(__dirname, '../models/customers.json');
    fs.readFile(file, 'utf8', function(err,data){
        if(err){
            next(err);
        } else {
            var obj = JSON.parse(data);
            var customer = obj;

            if(id){
                obj.forEach(function(elem){
                    if(elem.id == id){
                        customer = elem;
                    }
                });
            }

            res.json(customer);
        }
    })
});

module.exports = router;