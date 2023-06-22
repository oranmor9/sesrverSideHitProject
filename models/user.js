/* 
Tal Yehuda 315006031
Oran Mor 318854338
*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    id: {
        type: String,
        //validate: {
        //    validator: Number.isInteger,
        //    message: 'ID must be an integer.'
        //}
    },
    first_name: {
        required: true,
        type: String,
    },
    last_name: {
        required: true,
        type: String,
    },
    birthday: {
        required: true,
        type: Date,
    }
});

module.exports = mongoose.model("User", usersSchema);