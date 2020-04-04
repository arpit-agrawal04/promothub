//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
    orderId: String,
    pickupDate: String,
    pickupTime: String,
    customer: {
        fName:String,
        lName:String,
        phone:String
    },
    deliveryBoy: {
        email:String,
        phone:String,
    },
    pickupBoy: {
        email:String,
        phone:String,
    },
    createdAt:Date,
    add:String,
    city: String,
    country:String,
    zipCode: Number,
    remark:String,
    compnyID:String,
    washFold:{type:Boolean,default:false},
  ironFold:{type:Boolean,default:false},
  washIron:{type:Boolean,default:false},
  dryClean:{type:Boolean,default:false},
  washFoldOrder:{clothCount:Number,clothWeight:Number},
  ironFoldOrder:{clothCount:Number,clothWeight:Number},
  washIronOrder:{clothCount:Number,clothWeight:Number},
  dryCleanOrder:{clothCount:Number,clothWeight:Number},
  status:String,
  StatusUpdatedAt:Date,

  });
  exports.Order = mongoose.model('order', userSchema );