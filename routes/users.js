const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Models
const User = require("../models/User");
const Book = require("../models/Book");
const { json } = require("express");

router.post("/",(req,res)=>{
    const user = new User(
        req.body
    );
    const promise = user.save();
    promise.then((data)=>{
        res.json({status : 1});
    }).catch((err)=>{
        res.json(err);
    });
});
router.get("/",(req,res)=>{
    const promise = User.find();
    promise.then((data)=>{
        if(!data)
            res.json('user is not found');
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});
router.get("/:user_id",(req,res)=>{
    const promise = User.findById( req.params.user_id);
    promise.then((data)=>{
        if(!data)
            next({message : 'the user was not found'});
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});
router.post("/:user_id/borrow/:book_id",(req,res,next)=>{
    const bookPromise = Book.findById(req.params.book_id);
    bookPromise.then((data)=>{
        if(data && data.status === false){
            const userPromise = User.findByIdAndUpdate(
                req.params.user_id,
                {books : data.book},
                {
                    new : true
                }
            );
            userPromise.then((data)=>{
                if(!data)
                    next({message : 'the user was not found'});
                else{
                    const BookUpdatePromise = Book.findByIdAndUpdate(
                        req.params.book_id,
                        {status : 1},
                        {
                            new : true
                        }
                    );
                    BookUpdatePromise.then((data)=>{
                        if(!data)
                            next({message : "the book was not found"})
                        res.json(data)
                    }).catch((err)=>{
                        res.json(err)
                    })
                }
            }).catch((err)=>{
                res.json(err);
            });

        } else
           next({message : "book was not found"})

    }).catch((err)=>{
        res.json(err);
    })
    
    
});
router.post("/:user_id/return/:book_id",(req,res,next)=>{
    const promise = User.findByIdAndUpdate(
        req.params.user_id,
        req.body,
        {
            new : true
        }
    );
    promise.then((data)=>{
        if(!data)
            next({message : 'the user was not found'});
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});
router.delete("/:user_id",(req,res,next)=>{
    const promise = User.findByIdAndRemove(req.params.user_id,{new : true});
    promise.then((data)=>{
        if(!data)
            res.json('user is not found');
        res.json('deleted');
    }).catch((err)=>{
        res.json(err);
    });
})
module.exports = router;