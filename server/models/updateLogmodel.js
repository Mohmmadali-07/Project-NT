const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const categorySchema = new Schema({
    
    
    result: {
        required: false,
        type: Object
    },  
    timestamp: {
        type: Date,
        default: Date.now
      }
    
    
});

const category = mongoose.model('updateLog', categorySchema);
module.exports = category;