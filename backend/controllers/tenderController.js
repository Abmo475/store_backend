const cloudinary=require('cloudinary');
const TenderModel = require('../models/TenderModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
exports.AddTender = asyncErrorHandler(async (req, res) => {
    const lastTender=await TenderModel.findOne().sort({ field: 'asc', _id: -1 })

    let scannedFiles = [];
    if (typeof req.body.documents === "string") {
        scannedFiles.push(req.body.documents);
    } else {
        scannedFiles = req.body.documents;
    }
    const scannedFilesLink = [];
    for (let i = 0; i < scannedFiles.length; i++) {
        const result = await cloudinary.v2.uploader.upload(scannedFiles[i], {
            folder: "documents",
        });
        scannedFilesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    const result = await cloudinary.v2.uploader.upload(req.body.logo, {
        folder: "logos",
    });
    const profile = {
        public_id: result.public_id,
        url: result.secure_url,
    };
    req.body.logo=profile;
    req.body.code=(lastTender?.code>0?lastTender?.code+1:1)
    req.body.documents = scannedFilesLink;
    console.log(req.body)
    const tender = await TenderModel.create(req.body);
 
        res.status(201).json({
            success: true,
            tender
        });
});
exports.getAllTenders = asyncErrorHandler(async (req, res, next) => {

    const resultPerPage = 12;
    const tendersCount = await TenderModel.countDocuments();
      console.log(req.query);

    const searchFeature = new SearchFeatures(TenderModel.find(), req.query)
        .search()
        .filter();

    let tenders = await searchFeature.query;
    let filteredtendersCount = tenders.length;

    searchFeature.pagination(resultPerPage);

    tenders = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        tenders,
        tendersCount,
        resultPerPage,
        filteredtendersCount,
    });
});
exports.getAdminTenders= asyncErrorHandler(async (req, res, next) => {
    const tenders = await TenderModel.find();
    res.status(200).json({
        success: true,
        tenders,
    });
});
 