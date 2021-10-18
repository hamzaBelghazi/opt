const multer = require('multer');
const VirtualTry = require('../models/virtualTryModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/tryon');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const vUpload = multer({ storage: storage });

exports.uploadProductVirt = vUpload.fields([
  { name: 'virtualsObject', maxCount: 5 },
]);

exports.resolveJsonObject = catchAsync(async (req, res, next) => {
  if (!req.files.virtualsObject)
    return next(new AppError('please provide a json 3d object'));

  req.body.virtualsObject = [];
  req.files.virtualsObject.map((file) => {
    req.body.virtualsObject.push(file.originalname);
  });

  next();
});

exports.addVirtualTry = factory.createOne(VirtualTry);
exports.deleteVirtualTry = factory.deleteOne(VirtualTry);
exports.getAllVirtualTrys = factory.getAll(VirtualTry);
