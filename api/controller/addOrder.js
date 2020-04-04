const Customer = require('../model/customer').Customer
const User = require('../model/user').User
const Order = require('../model/order').Order
const bcrypt = require('bcrypt');
var Puid = require('puid');
exports.getBasicAdd=function(req,res){
    console.log(req.body)
    User.aggregate([
        {
        $match:{email:req.body.userId}
    },
    { 
        $addFields: { "id": { "$toString": "$_id" } }
      },{
        $lookup:
        {
        from: 'users',
       localField: 'id',
       foreignField: 'compnyID',
       as: 'DeliveryBoy'
    }
},
    {$project:
        { add: 1,
            city: 1,
            country:1,
            zipCode: 1,'DeliveryBoy.type':'delivery','DeliveryBoy.phone':1,'DeliveryBoy.email':1
        }
    }
],
    (err,data)=>{
        console.log(err,data)
                if(!err){
                    res.json({
                        success:true,
                        message:data[0]
                    })
                }else{
                    console.log(err);
                    
                }
            })
   

}

exports.SignStaffUser=function(req,res){
   // $match:{email:req.body.userId}
User.find({email:req.body.userId},{_id:1},(err,data)=>{
    if(!err){
       var compnyID=data[0]._id;
        bcrypt.hash(req.body.phone, 10, function(err, hash) {
            console.log(hash)
            if(!err){
              req.body.password=hash
              req.body.type='delivery'
              req.body.compnyID=compnyID
        User.updateOne({email:req.body.email},{$set:req.body},{upsert:true,multi:false},(err,success)=>{
            if(!err){
                res.json({
                    success:true,
                    message:'added staff'
                })
            }
        })
    }
})
}
})

}

exports.findCustomer =function(req,res){
    User.find({email:req.body.userId},{_id:1},(err,data)=>{
        if(!err){
           var compnyID=data[0]._id;
           Customer.find({compnyID:compnyID,phone:{$regex:req.body.regex}},{compnyID:0,_id:0},(err,regexed)=>{
               if(!err){
                res.json({
                    success:true,
                    message:regexed
                })
               }
           })
        }
    });
}

exports.addOrder =function(req,res){
    User.find({email:req.body.userId},{_id:1},(err,data)=>{
        if(!err){
           var compnyID=data[0]._id;
           Customer.updateOne({compnyID:compnyID,phone:req.body.phone},{$set:req.body},{upsert:true,multi:false},(err,sucs)=>{
               if(!err){
                   let orderId=''
               
                req.body.deliveryBoy= {email:req.body.deliveryBoy.split(',')[0],
                phone: req.body.deliveryBoy.split(',')[1]}
                req.body.customer= {fName:req.body.fName,lName:req.body.lName,
                phone: req.body.phone}
                if(req.body.orderId===undefined||req.body.orderId===null){
                    delete req.body.orderId;
                    puid = new Puid(false);
                     orderId=puid.generate()
                    req.body.createdAt=new Date().toISOString()
                }else{
                    orderId=req.body.orderId
                }
               
                req.body.StatusUpdatedAt=new Date().toISOString()
                
                Order.updateOne({compnyID:compnyID,orderId:orderId},{$set:req.body},{upsert:true,multi:false},(err,success)=>{
                    if(!err){
                        res.json({
                            success:true,
                            message:orderId
                        })
                    }
                })
               }
           })
        }
    })
}

exports.getCompleteStaffDetails = function(req,res){
    User.aggregate([  {
        $match:{email:req.body.userId}
    }, { 
        $addFields: { "id": { "$toString": "$_id" } }
      },{
        $lookup:
        {
        from: 'users',
       localField: 'id',
       foreignField: 'compnyID',
       as: 'staff'
    }
},
    {$project:
        { 'staff.phone':1,'staff.fName':1
    ,'staff.email':1,'staff.type':1
    ,'staff.idCard':1,'staff.lName':1
        }
    }
],
    (err,data)=>{
        console.log(err,data)
                if(!err){
                    res.json({
                        success:true,
                        message:data[0].staff
                    })
                }else{
                    console.log(err);
                }  
                })
}

exports.getStaffComp =function(req,res){
       // $match:{email:req.body.userId}
User.find({email:req.body.userId},{_id:1},(err,data)=>{
    if(!err){
       var compnyID=data[0]._id;
    }
    User.findOne({email:req.body.email,compnyID:compnyID},{_id:0,password:0,__v:0,compny:0},(err,data)=>{
        res.json({
            success:true,
            message:data
        })
    })
})
}

exports.UpdateStaffUser =function(req,res){
    User.updateOne({compnyID:req.body.compnyID,email:req.body.email},{$set:req.body},(err,suces)=>{
        if(!err){
            res.json({
                success:true,
                message:'done'

            })
        }
    })
}


exports.GetAllCustomers =function(req,res){ 
    User.find({email:req.body.userId},{_id:1},(err,data)=>{
        if(!err){
           var compnyID=data[0]._id.toString();
           console.log(compnyID)
           Customer.aggregate([
            {
              '$match': {
                'compnyID':compnyID
              }
            }, {
              '$lookup': {
                'from': 'orders', 
                'localField': 'phone', 
                'foreignField': 'customer.phone', 
                'as': 'totalOrder'
              }
            }, {
              '$project': {
                'phone': 1, 
                'fName': 1, 
                'lName': 1, 
                'add': 1, 
                'totalOrder.compnyID': compnyID, 
                'totalOrder._id': 1,
                'totalOrder.status': 1,
              }
            }
          ],(err,dataA)=>{
            console.log(dataA,err)
            res.json({
                success:true,
                message:dataA
            })
        })
        }
    })
}


exports.GetAllOrders =function(req,res){
    User.aggregate([  {
        $match:{email:req.body.userId}
    }, { 
        $addFields: { "id": { "$toString": "$_id" } }
      },{
        $lookup:
        {
        from: 'orders',
       localField: 'id',
       foreignField: 'compnyID',
       as: 'AllOrders'
    }
},
    {$project:
        { 'AllOrders':1 ,_id:0       }
    }
],
    (err,data)=>{
        console.log(err,data)
                if(!err){
                    res.json({
                        success:true,
                        message:data[0].AllOrders
                    })
                }else{
                    console.log(err); 
                }  
                })
}

exports.infoToEditOrder =function(req,res){
 
    Order.findOne({orderId:req.body.orderId},{_id:0,__v: 0,createdAt:0,StatusUpdatedAt:0,status:0},(err,orderData)=>{
       
         User.find({compnyID:orderData.compnyID,type:'delivery'},{phone:1,email:1,_id:0},(err,deliveryBoy)=>{
            let formData={}
           
             formData.fName=orderData.customer.fName
             if(orderData.customer.lName){
                formData.lName=orderData.customer.lName
             }else{
                formData.lName=''
             }
             formData.phone=orderData.customer.phone
             formData.deliveryBoy=orderData.deliveryBoy.email+','+orderData.deliveryBoy.phone
            formData.add=orderData.add
            formData.country=orderData.country
            formData.city=orderData.city
            formData.zipCode=orderData.zipCode
            formData.pickupDate=orderData.pickupDate
            formData.pickupTime=orderData.pickupTime
            formData.washFold=orderData.washFold
            formData.ironFold=orderData.ironFold
            formData.washIron=orderData.washIron
            formData.dryClean=orderData.dryClean
            formData.remark=orderData.remark
            formData.orderId=orderData.orderId
            

             res.json({
                 success:true,
                 message:{
                     formData:formData,
                     DeliveryBoy:deliveryBoy
                 }
             })
         })
    
    })
} 


exports.deleteOrder =function(req,res){
    Order.remove({orderId:req.body.orderId},(err,sucess)=>{
        if(!err){
            res.json({
                success:true,
                message:'sucessfully deleted'
            })
        }
    })
}