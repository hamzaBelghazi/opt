const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Collection = require('../models/collectionModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadcollectionImages = upload.single('collectionImage');

exports.resizecollectionImages = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.collectionImage = `collection-${Math.trunc(
    Math.random() * 12222222
  )}-${Date.now()}.png`;
  await sharp(req.file.buffer)
    .toFormat('png')
    .png({ quality: 100 })
    .toFile(`public/img/collection/${req.body.collectionImage}`);
  next();
});

exports.addcollection = factory.createOne(Collection);
exports.deletecollection = factory.deleteOne(Collection);
exports.getAllcollections = factory.getAll(Collection);
