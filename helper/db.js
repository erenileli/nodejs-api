const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/movie-api');
    mongoose.connection.on('open',()=>{
        console.log("bağlandı.");
    });
    mongoose.connection.on('error',(err)=>{
        console.log("bağlanamadı.",err);
    });

    mongoose.Promise = global.Promise;
};

