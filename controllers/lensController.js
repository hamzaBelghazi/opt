const multer = require('multer');
const sharp = require('sharp');
const Lens = require('../models/lensModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

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

exports.uploadLensImages = upload.any([{ name: 'photo', maxCount: 20 }]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizeLensImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  const thikns = req.files.map(async (el) => {
    const number = Number(el.fieldname.split('[')[1].split('')[0]);
    req.body.thickness[number] = { ...req.body.thickness[number] };
    req.body.thickness[number].photo = `lens-${Math.trunc(
      Math.random() * 11111111111
    )}-${Date.now()}-lens.png`;
    await sharp(el.buffer)
      .toFormat('png')
      .png({ quality: 100 })
      .toFile(`public/img/lenses/${req.body.thickness[number].photo}`);
  });

  next();
});

exports.getLens = factory.getOne(Lens);
exports.createLens = factory.createOne(Lens);
exports.updateLens = factory.updateOne(Lens);
exports.deleteLens = factory.deleteOne(Lens);
