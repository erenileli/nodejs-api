const express = require("express");
const router = express.Router();

// Models
const Director = require("../models/Director");

router.post("/",(req,res)=>{
    const director = new Director(
        req.body
    );
    const promise = director.save();
    promise.then((data)=>{
        res.json({status : 1});
    }).catch((err)=>{
        res.json(err);
    });
});
module.exports = router;