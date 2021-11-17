const { json } = require('express');
const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

/* GET users listing. */
router.get('/',(req,res,next)=>{
  Movie.find({ },(err,data)=>{
    if(err)
      res.json(err);
    else 
      res.json(data);
  });
})
router.post('/', (req, res, next) => {

  // const data = req.body;
  // res.json(data);

  // const {title,imdb_score,category,country,year} = req.body;

  const movie = new Movie(
    req.body
  );
  movie.save((err,data)=>{
    if(err)
      res.json(err);
    else 
      res.json(data)
  });
  // const promise = movie.save();
  // promise.then((data)=>{
  //   res.json({status : 1});
  // })
  // .cath((err)=>{
  //   res.json(err);
  // });

});

module.exports = router;
