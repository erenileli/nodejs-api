const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    book : {
        type : String ,
        required : [true,"'{PATH} alanı gereklidir'"],
        maxlength : [20,"'{PATH}'alanı ('{VALUE}'), ({MAXLENGTH}) karakterden küçük olmalıdır"],
        minlength : [2,"'{PATH}'alanı ('{VALUE}'), ({MİNLENGTH}) karakterden büyük olmalıdır"]
    },
    category :  String,
    total_vote: {
        type : Number,
        default : 0
    },
    score : {
        type : Number,
        default : 0
    },
    status : {
        type : Boolean,
        default: 0,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
    
})
module.exports = mongoose.model('book',BookSchema);