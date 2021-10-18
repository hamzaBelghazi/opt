const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, 'this collection alredy exist!'],
    },
    desc: {
      type: String,
    },
    collectionImage: {
      type: String,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model('Collection', collectionSchema);
