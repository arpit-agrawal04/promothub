//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  phone: String,
  fName: String,
  lName: String,
  add: String,
  city: String,
  country:String,
  zipCode: Number,
  compnyID:String,

});
exports.Customer = mongoose.model('customer', userSchema );