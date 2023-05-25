const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const emailModel = require("../models/emailModel")
const OtpModel = require("../models/OtpModel");
const mailer=require('nodemailer')

exports.sendOtpOrder=asyncErrorHandler(async(req,res,next)=>{
  
    const otp=this.generate(6);
   
      const transporter=mailer.createTransport({
        service:'gmail',
        auth:{
            user:'abmo475@gmail.com',
            pass:'eaexknddhisowbfi'
        },
        tls:{
            rejectUnauthorized:false,
        }
    })
    
    const mailoption={
        to:req.user.email,
        from:'abmo475@gmail.com',
        subject:'Email Confirmation for Order',
        html:'<html><body><h3>This email is sent to you for confirmation of purchase on medmart<br>'+
        'You are asked to enter code below<br> <b>'+otp+'</b></h3><br><br>'+
       'Got to website and input the code to proceed with the payment<br><hr>Medmart Inc <br>medmart.com &#169; 2023</body></html>',  
    }
    transporter.sendMail(mailoption,async(err,success)=>{
        if(err){
          return 0
        }else{
       const mail=await emailModel.create({to:mailoption.to,from:mailoption.from,body:mailoption.html,subject:mailoption.subject})
       console.log(mail);
       const data= await OtpModel.create({mailid:mail._id,code:otp,expiry:Date.now(),status:0})
      
       return 3
        }
    })
   
    // res.status(200).json({code:3})
})
exports.generate=(n)=>{
    var add = 1, max = 12 - add;   
    
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    
    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
    return ("" + number).substring(add); 
}