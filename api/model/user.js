//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  website: String,
  compny: String,
  fName: String,
  lName: String,
  add: String,
  city: String,
  country:String,
  zipCode: Number,
  password:String,
  cPassword:String,
  about: String,
  washFold:{type:Boolean,required:false},
  ironFold:{type:Boolean,required:false},
  washIron:{type:Boolean,required:false},
  dryClean:{type:Boolean,required:false},
  type:String,
  compnyID:String,
  idCard:String,
  phone:String


});
exports.User = mongoose.model('user', userSchema );