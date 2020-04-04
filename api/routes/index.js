var express = require('express');
var router = express.Router();
var User = require('../model/user').User
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken')
let secret = require('../config/config').secret
/* GET home page. */
router.post('/signup', function(req, res) {
//console.log(req.body)
req.body.email=req.body.email.trim().toLowerCase()
User.find({email:req.body.email},(err,exsists)=>{
if(err){
  console.log(err)
}else{
 
  if(exsists[0]==undefined){
    console.log(exsists,"check for id")
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      console.log(hash)
      if(!err){
        req.body.password=hash
        req.body.type='owner'
        User.updateOne({email:req.body.email},{$set:req.body},{upsert:true,multi:false},(err,success)=>{
          if(err){
            console.log(err)
          }else{
            res.json({
              success:true,
              message:'done'
            })
          }
        });

      }
      // Store hash in database
    });
  }else{
    res.json({
      success:false,
      message:'email already Exists'
    
    })
  }
  

}
})

});
router.post('/loginUser', function(req, res) {
  console.log(req.body)
  req.body.email=req.body.userId.trim().toLowerCase()
  User.find({email:req.body.email},{type:1,password:1,fName:1,compny:1},(err,exsists)=>{
  if(err){
    console.log(err)
  }else{
   
    if(exsists[0]==undefined){
      res.json({
        success:false,
        message:'Please enter valid credential'
      
      })
     
    }else{

      bcrypt.compare(req.body.password,exsists[0].password,(err,matched)=>{
        if(!err && matched){
          jwt.sign({username: req.body.email},
            secret,
            { expiresIn: '24h' },(err,token)=>{
        
              var data ={
                fName:exsists[0].fName,
                compny:exsists[0].compny,
                token:token,
                type:exsists[0].type
              }
              res.json({
                success:true,
                message:data
              
              })
            } )
        }else{
          res.json({
            success:false,
            message:'Please enter valid credential'
          
          })
        }
      })
    }
  }
});
  
  });

module.exports = router;

