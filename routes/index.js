const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// models
const User = require("../models/User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register', function(req, res, next) {
  const {user_name,password}=req.body;
  bcrypt.hash(password, 8, (err, hash)=> {
    const user = new User({
      user_name,
      password : hash
  })
  const promise = user.save();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
  });
  
});
router.post("/auth",(req,res)=>{
  const {username,password} = req.body;
  User.findOne({username},(err,user)=>{
    if(err)
      throw err;
    if(!user){
      res.json({
        status : false,
        message : 'username is not found'
      })
    }
    else {
      bcrypt.compare(password,user.password).then((result)=>{
        if(!result){
          res.json({
            status : false,
            message : 'password is wrong'
          });
        }
        else{
          const payload = {
            username
          };
          const token = jwt.sign(payload,req.app.get("api_secret_key"),{
            expiresIn : 720 //12saat
          });
          res.json({
            status :true,
            token
          });
        }
      });
    }
  })
});
module.exports = router;
