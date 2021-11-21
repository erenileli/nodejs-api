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
  // movie.save((err,data)=>{
  //   if(err)
  //     res.json(err);
  //   else 
  //     res.json(data)
  // });

  // movie save
   const promise = movie.save();
  promise.then((data)=>{
    res.json({status:1});
  }).catch((err)=>{
    res.json(err);
  })

});
// top10 list
router.get("/top10",(req,res,next)=>{
  const promise = Movie.find({ }).limit(10).sort({imdb_score : -1});
  promise.then((data)=>{
    if(!data)
      next({ message: 'The movie was not found.', code: 99 });
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});
// movie find 
router.get("/:movie_id",(req,res,next)=>{
  const promise = Movie.findById(req.params.movie_id);
  promise.then((data)=>{
    if(!data)
      next({ message: 'The movie was not found.', code: 99 });
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});
// movie update movie
router.put("/:movie_id",(req,res,next)=>{
  const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});
  promise.then((data)=>{
    if(!data)
      next({ message: 'The movie was not found.', code: 99 });
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});
// delete movie
router.delete("/:movie_id",(req,res,next)=>{
  const promise = Movie.findByIdAndDelete(req.params.movie_id,{new:true});
  promise.then((data)=>{
    if(!data)
      next({ message: 'The movie is not found.', code: 99 });
    res.json({status : "delete"});
  }).catch((err)=>{
    res.json(err);
  })
});

// between 
router.get("/between/:start_year/:end_year",(req,res,next)=>{
  const {start_year,end_year} = req.params;
  const promise = Movie.find({
    year : { "$gte": parseInt(start_year), "$lte": parseInt(end_year)}
   });
  promise.then((data)=>{
    if(!data)
      next({message : 'The movie is not found'});
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
});

module.exports = router;
