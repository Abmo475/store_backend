const mongoose  = require("mongoose");

const MessageSchema = new mongoose.Schema({
    senderid:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    reciverid:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    message:
        {
            content: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now()
            }
       

        },
    createdAt: {
        type: Date,
        default: Date.now,
    },
 
});
module.exports = mongoose.model('Message', MessageSchema);