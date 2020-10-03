const express = require("express");
const router = express.Router();

const mongojs = require("mongojs");
const db = mongojs("mongodb://127.0.0.1:27017/xallet", [ "EnhancedKYC" ]);

router.get("/people", function(req, res) {
 const people = [
 { name: "Bobo", age: 22 },
 { name: "Nini", age: 23 },
 ];
 return res.status(200).json(people);
});

router.get("/people/:id", function(req, res) {
 const id = req.params.id;
 return res.status(200).json({ id });
});

router.get("/records", function(req, res){
    db.EnhancedKYC.find(function(err, data) {
    if(err) {
        return res.sendStatus(500);
    } else {
        return res.status(200).json({
        meta: { total: data.length },
        data
        });
    }
    });
   });

router.get("/test", function(req, res) {
    return res.json(req.query);
});

module.exports = router;