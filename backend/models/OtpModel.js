const mongoose =require('mongoose');
const OtpSchema=new mongoose.Schema({
    mailid:{
       
            type: mongoose.Schema.ObjectId,
            ref: "Email",
            required: true
        },
code:{
    type:String,
    required:true
},
expiry:{
    type:Date,
    required:true
},
status:{
    type:Number,
    required:true
},
createdAt:{
    type:Date,
    default:Date.now
}
})
module.exports = mongoose.model('Otp',OtpSchema);
