const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "Please Enter code"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter description"],
     
    },
    price: {
        type: String,
        required: [true, "Please Enter price"],
     
    },
    region: {
        type: String,
        required:[true,"Please Enter region"]
    },
    category: {
        type: String,
        required:[true,"Please Enter category"]
    },
    company_type: {
        type: String,
        required:[true,"Please Enter company Type"]
    },
    company: {
        type: String,
        required:[true,"Please Enter company"]
    },
    documents: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ],
    logo: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
            },
    deadline: {
        type: Date,
        default:50,
    },
    published: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Tender', tenderSchema);
