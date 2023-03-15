const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    
  image: {
    type: Object
  },
  update: {
    type: Object // or the appropriate schema type for your use case
  },
  newExpense: {
    type: Object // or the appropriate schema type for your use case
  },
    
});

const expense = mongoose.model('expense', expenseSchema);
module.exports = expense;


