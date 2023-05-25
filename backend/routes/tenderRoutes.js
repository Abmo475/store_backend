const  { AddTender, getAllTenders, getAdminTenders }=require('../controllers/tenderController');
const express = require('express');
const { authorizeRoles, isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.route('/tender/add').post(AddTender);
router.route('/alltenders').get(getAllTenders);
router.route('/admin/tenders').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminTenders);

module.exports=router;