/* 
Tal Yehuda 315006031
Oran Mor 318854338
*/


require('dotenv').config();
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/mongo');
const mongoString = process.env.DATABASE_URL
const database = mongoose.connection
mongoose.connect(mongoString);
const routes = require('./routes/routes');
const userUTL = require('./config/utilities')
const bodyParser = require('body-parser');


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(bodyParser.json());
app.use('', routes);
app.use(express.json());
connectDB();

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})





