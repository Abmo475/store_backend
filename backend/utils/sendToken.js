const store = require("store2");
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + 7*24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
    // console.log(options,token,statusCode)
    // store({'token':token}); 
   //  console.log(store('token'))
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
    });
}

module.exports = sendToken;