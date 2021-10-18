const mongoose = require('mongoose');

const thick = mongoose.Schema({
  subtitle: {
    type: String,
  },
  photo: {
    type: String,
    default: 'thik.png',
  },
  refraction: {
    type: Number,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
  },
});
const lens = mongoose.Schema({
  subtitle: {
    type: String,
  },
  desc: {
    type: String,
  },
});
const pars = mongoose.Schema({
  subtitle: {
    type: String,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const lensSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    title: {
      type: String,
    },
    lensType: [lens],
    thickness: [thick],
    advancedLensType: [pars],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// pre Populate product

lensSchema.pre(/^find/, function (next) {
  this.populate('product');
  next();
});

const Lens = mongoose.model('Lens', lensSchema);

module.exports = Lens;
