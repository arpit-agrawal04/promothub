//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  phone: String,
  compnay: String,
      compnayType: String,
      employes: String,
      marketing: String,
      offer: String,
      sessionId:String,

});
exports.TempUser = mongoose.model('temp_user', userSchema );