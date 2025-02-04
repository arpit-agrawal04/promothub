var mongoose = require('mongoose');
var url = require('../config/config').mongoURL
//Set up default mongoose connection
var mongoDB =url;
console.log(mongoDB);

mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));