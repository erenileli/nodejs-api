const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

/* GET users listing. */
router.get('/',(req,res,next)=>{
  const promise = Book.find();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});
router.post('/', (req, res, next) => {

  // const data = req.body;
  // res.json(data);

  // const {title,imdb_score,category,country,year} = req.body;

  const book = new Book(
    req.body
  );
  // book.save((err,data)=>{
  //   if(err)
  //     res.json(err);
  //   else 
  //     res.json(data)
  // });

  // book save
   const promise = book.save();
  promise.then((data)=>{
    res.json({status:1});
  }).catch((err)=>{
    res.json(err);
  })

});
// top10 list
router.get("/top10",(req,res,next)=>{
  const promise = Book.find({ }).limit(10).sort({imdb_score : -1});
  promise.then((data)=>{
    if(!data)
      next({ message: 'The book was not found.', code: 99 });
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});
// book find 
router.get("/:book_id",(req,res,next)=>{
  const promise = Book.findById(req.params.book_id);
  promise.then((data)=>{
    if(!data)
      next({ message: 'The book was not found.', code: 99 });
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});
// book update book
router.put("/:book_id",(req,res,next)=>{
  const promise = Book.findByIdAndUpdate(req.params.book_id,req.body,{new:true});
  promise.then((data)=>{
    if(!data)
      next({ message: 'The book was not found.', code: 99 });
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});
// delete book
router.delete("/:book_id",(req,res,next)=>{
  const promise = Book.findByIdAndDelete(req.params.book_id,{new:true});
  promise.then((data)=>{
    if(!data)
      next({ message: 'The book is not found.', code: 99 });
    res.json({status : "delete"});
  }).catch((err)=>{
    res.json(err);
  })
});

// between 
router.get("/between/:start_year/:end_year",(req,res,next)=>{
  const {start_year,end_year} = req.params;
  const promise = Book.find({
    year : { "$gte": parseInt(start_year), "$lte": parseInt(end_year)}
   });
  promise.then((data)=>{
    if(!data)
      next({message : 'The book is not found'});
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
});

module.exports = router;
