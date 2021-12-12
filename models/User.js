const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_name : {
        type : String ,
        required : [true,"'{PATH} alanı gereklidir'"],
        maxlength : [20,"'{PATH}'alanı ('{VALUE}'), ({MAXLENGTH}) karakterden küçük olmalıdır"],
        minlength : [2,"'{PATH}'alanı ('{VALUE}'), ({MİNLENGTH}) karakterden büyük olmalıdır"]
    },
    password :{
        type : String,
        required : true,
        unique :true,
        min :5
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
    
})
module.exports = mongoose.model('user',UserSchema);