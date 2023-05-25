const mailer=require('nodemailer')
exports.sendemail=(emaildata)=>{
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
    transporter.sendMail(emaildata,(err,success)=>{
        if(err){
          return 0
        }else{
           return 1
        }
    })
}
