const Customer = require('../model/customer').Customer
const User = require('../model/user').User
const Order = require('../model/order').Order

exports.todayDeliveryTask = function(req,res){
    Order.aggregate([{$match:{$or:[{'deliveryBoy.email':req.body.userId,'status':{$exists:false}}]}},{
        $project:{
            _id:0,
            customer:1,
            add:1,
            city: 1,
            country:1,
            zipCode: 1,
            orderId: 1,
            pickupDate: 1,
            pickupTime: 1,
        }
    }, { $sort : { pickupDate : 1, pickupTime: 1 } }],(err,orderData)=>{
        res.json({
            success:true,
            message:orderData
        })
    })
}

exports.rescheduleOrder =function(req,res){
    Order.updateOne({orderId:req.body.orderId},{$set:req.body},(err,success)=>{
        if(!err){
            res.json({success:true,
           message:"UpdatedDate"})
        }
           })
}

exports.cancelOrder =function(req,res){
    Order.updateOne({orderId:req.body.orderId},{$set:{status:'Cancelled ',StatusUpdatedAt:new Date().toISOString()}},(err,success)=>{
 if(!err){
     res.json({success:true,
    message:"order marked cancelled"})
 }
    })
}


exports.deliveryBoyReached = function(req,res){
    let resData={}
    Order.findOne({orderId:req.body.orderId},{_id:0,'customer.phone':1,orderId:1,'customer.fName':1,'customer.lName':1,remark:1,status:1,dryClean:1,washFold:1,ironFold: 1,washIron: 1,},(err,formData)=>{
        if(!err){
            resData.phone=formData.customer.phone
            resData.fName=formData.customer.fName
            resData.lName=formData.customer.lName
            resData.remark=formData.remark
            resData.orderId=formData.orderId
            resData.ironFold=formData.ironFold
            resData.dryClean=formData.dryClean
            resData.washFold=formData.washFold
            resData.washIron=formData.washIron
            resData.status=formData.status
            res.json({
                success:true,
                message:resData
            })
        }
    })
}


exports.deliveryUpdate = function(req,res){
    req.body.customer= {fName:req.body.fName,lName:req.body.lName,
        phone: req.body.phone}
        req.body.status='Pickedup'
        req.body.StatusUpdatedAt=new Date().toISOString()
    Order.updateOne({orderId:req.body.orderId},{$set:req.body},(err,success)=>{
        res.json({
            success:true,
            message:"successfully pickup"
        })
    })
}