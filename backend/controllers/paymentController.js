const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const https = require('https');
const Payment = require('../models/paymentModel');
const ErrorHandler = require('../utils/errorHandler');
const { v4: uuidv4 } = require('uuid');

exports.addPayment = async (data) => {
const paymentData={
    txnId:uuidv4(),
    paymentMethod:data.paymentMethod,
    orderId:data.orderId,
    txnAmount:data.txnAmount,
    refundAmt:data.txnAmount,
    status:"TXN_SUCCESS"
}
console.log(paymentData)
try{
    await Payment.create(paymentData);
}catch(err){
    console.log(err);
}






    // try {
    //     await Payment.create(data);
    // } catch (error) {
    //     console.log("Payment Failed!");
    // }
}

exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {

    const payment = await Payment.findOne({ orderId: req.params.id });
    if (!payment) {
        return next(new ErrorHandler("Payment Details Not Found", 404));
    }
    const txn = {
        id: payment._id,
        status: payment.status,
    }
    res.status(200).json({
        success: true,
        txn,
    });
});
