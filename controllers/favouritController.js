const Favourit = require('../models/favouritModel');
const factory = require('./handlerFactory');

exports.addFavourit = factory.createOne(Favourit);
exports.deleteFavourit = factory.deleteOne(Favourit);

exports.deleteFavouritTest = async (req, res, next) => {
  await Favourit.deleteOne({ _id: req.params.id });
  res.status(204).json({
    status: 'success',
  });
};
