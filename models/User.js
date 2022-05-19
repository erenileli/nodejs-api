const { json } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String ,
        required : [true,"'{PATH} alanı gereklidir'"],
        maxlength : [20,"'{PATH}'alanı ('{VALUE}'), ({MAXLENGTH}) karakterden küçük olmalıdır"],
        minlength : [2,"'{PATH}'alanı ('{VALUE}'), ({MİNLENGTH}) karakterden büyük olmalıdır"]
    },
    prev_books: JSON,
    books: JSON,
    createdAt : {
        type : Date,
        default : Date.now
    }
    
})
module.exports = mongoose.model('user',UserSchema);