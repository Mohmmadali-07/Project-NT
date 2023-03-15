const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    name: {
        required: true,
        type: String
    },
    mobile: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
    
});

const user = mongoose.model('users', userSchema);
module.exports = user;