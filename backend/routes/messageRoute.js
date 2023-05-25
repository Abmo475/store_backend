const express=require('express');
const { sendMessage, GetMessages } = require('../controllers/messageController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router=express.Router();


router.route('/send').post(isAuthenticatedUser,sendMessage);
router.route('/sent').get(isAuthenticatedUser,GetMessages);
module.exports = router;