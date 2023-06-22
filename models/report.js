/* 
Tal Yehuda 315006031
Oran Mor 318854338
*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  user_id: {
    type: String,
    required: [true, 'No user id']
  },
  year: {
    type: Number,
    required: [true, 'Please enter year']
  },
  month: {
    type: Number,
    required: [true, 'Please enter month']
  },
  day: {
    type: Number,
    required: [true, 'Please enter day']
  },
  category: {
    type: String,
    required: [true, 'Please enter category']
  },
  description: {
    type: String,
    required: [true, 'Please enter description']
  },
  overallSum: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Report", reportSchema);