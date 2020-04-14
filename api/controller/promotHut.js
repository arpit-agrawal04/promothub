var TempUser=require('../model/tempUser').TempUser
var Puid = require('puid');
var colorThief =require('./colorThief')
var ColorThief = require('color-thief');
exports.nextStep =function(req,res){
    
    if(req.body.sessionId=='undefined'||req.body.sessionId==undefined){
        puid = new Puid(false);
        req.body.sessionId=puid.generate()
       
    }
    console.log(req.body.sessionId,req.body)
    TempUser.updateOne({sessionId:req.body.sessionId},{$set:req.body},{upsert:true,multi:false},(err,result)=>{
        console.log(err,result)
        if(!err){
            res.json({
                success:true,
                message:'next tab',
                sessionId:req.body.sessionId
            })
        }else{
            res.json({
                success:false
            })
        }
    })
}

exports.getSessionData= function(req,res){
    let sessionId=req.body.sessionId
    console.log(sessionId)
    if(sessionId!=undefined &&sessionId!='undefined'){
    TempUser.find({sessionId:sessionId},{sessionId:0,_id:0,__v:0},(err,result)=>{
        if(!err){
            res.json({
                success:true,
                message:result[0],
                sessionId:sessionId
            })
        }else{
            res.json({
                success:false
            })
        }
    })
        
    }else{
        res.json({
            success:false
        })
    }
}


exports.uploadImage=function(req,res){
   
    var colorThief = new ColorThief();
    res.json({
        success:true,
        mainColor:colorThief.getColor(req.file.path),
        colors:colorThief.getPalette(req.file.path, 8)
    })
}