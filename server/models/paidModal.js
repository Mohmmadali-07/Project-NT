const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    
    category: {
        required: false,
        type: String
    },
    name: {
        required: false,
        type: String
    }
    
    
});

const category = mongoose.model('paid', categorySchema);
module.exports = category;