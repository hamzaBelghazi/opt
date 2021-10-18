const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Category = require('../models/categoryModel');

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

exports.uploadCategoryImages = upload.single('categoryImage');

exports.resizeCategoryImages = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.categoryImage = `category-${Math.trunc(
    Math.random() * 12222222
  )}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toFile(`public/img/category/${req.body.categoryImage}`);
  next();
});

exports.addCategory = factory.createOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
exports.getAllCategorys = factory.getAll(Category);
