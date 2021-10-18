const mongoose = require('mongoose');

const virtualTrySchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    virtualsObject: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('VirtualTry', virtualTrySchema);
