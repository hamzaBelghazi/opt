const mongoose = require('mongoose');
const Product = require('../models/productModel');

const favSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'please provide a product'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'user must be logged in!'],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

favSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        nLikes: { $sum: 1 },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      likesQuantity: stats[0].nLikes,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      likesQuantity: 0,
    });
  }
};

favSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.product);
});

favSchema.pre(/^findOneAnd/, async function (next) {
  this.constructor.calcAverageRatings(this.product);
  next();
});

favSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.product);
});

module.exports = mongoose.model('Favourit', favSchema);
