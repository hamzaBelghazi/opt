const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Banner = require('../models/bannerModel');

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

exports.uploadBannerImages = upload.single('slide');

exports.resizeBannerImages = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.slide = `banner-${Math.trunc(
    Math.random() * 12222222
  )}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toFile(`public/img/banners/${req.body.slide}`);

  next();
});

exports.addBanner = factory.createOne(Banner);
exports.deleteBanner = factory.deleteOne(Banner);
exports.getAllBanners = factory.getAll(Banner);
