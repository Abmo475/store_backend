const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const Message = require("../models/MessageModel");
const userModel = require("../models/userModel");

exports.sendMessage= asyncErrorHandler(async (req, res, next) => {
    const {reciverid,message}=req.body
    const sent=await Message.create({
        senderid:req.user._id,
        reciverid,
        message
    })

    res.status(200).json({
sent
    })

});
exports.GetMessages=asyncErrorHandler(async(req,res,next)=>{
    const users=await userModel.find();
    const sent= await Message.find({senderid:req.user._id})
    const recived= await Message.find({reciverid:req.user._id})
    const chat=[];
    function format(date){
        return date.toGMTString()//.toLocaleDateString()+date.toLocaleTimeString()
    }
    function custom_sort(a, b) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
for(let user of users){

    let n=1;
    if(user.name==req.user.name)
    continue
var sentMessages=[];
for(let mess of sent){
    if(mess.reciverid.toString()==user._id.toString())
    sentMessages.push({
        content:mess.message.content,
         time:mess.message.timestamp,
        type:"sent"
     }
)
}
for(let mess of recived){
    if(mess.senderid.toString()==user._id.toString())
    sentMessages.push({
        content:mess.message.content,
        time:mess.message.timestamp,
        type:"recived"
    }
        );
}
    sentMessages.sort(custom_sort);
      chat.push({
        id:user._id,
        name:user.name,
        photoUrl:user.avatar.url,
        messages:sentMessages
    })}
res.status(200).json({
    chat,
    success:true,
    sent,
    recived
})
})