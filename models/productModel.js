const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    glassWidth: {
      type: Number,
    },
    sideSize: {
      type: Number,
    },
    noasSize: {
      type: Number,
    },
    lenseSize: {
      type: Number,
    },
    lenseHeight: {
      type: Number,
    },
    templeColor: {
      type: String,
    },
    description: {
      type: String,
    },
    colors: [String],
    productGender: {
      type: String,
      enum: ['women', 'men', 'kid'],
    },
    glassesType: {
      type: String,
      enum: ['sunglasses', 'prescription'],
    },
    shape: {
      type: String,
    },
    frameMatirial: {
      type: String,
    },
    frameType: {
      type: String,
    },
    lenses: {
      type: mongoose.Schema.ObjectId,
      ref: 'Lens',
    },
    likesQuantity: Number,
    images: [String],
    collections: {
      type: mongoose.Schema.ObjectId,
      ref: 'Collection',
    },
    categories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('virualsTrys', {
  ref: 'VirtualTry',
  foreignField: 'productId',
  localField: '_id',
});

productSchema.virtual('favourit', {
  ref: 'Favourit',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre(/^find/, function (next) {
  this.populate('virualsTrys').populate('lenses').populate('favourit');
  next();
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
