const mongoose = require('mongoose');

var url = "mongodb://localhost:27017/Neptune";
const connectDB = async()=>{
try{
    await mongoose.connect(url, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'));
}catch(err){
    console.log(err.message);
}
}

module.exports = connectDB;