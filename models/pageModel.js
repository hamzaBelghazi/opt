const mongoose = require('mongoose');

const pageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, 'this page is already exist!'],
    },
    pageBody: {
      type: String,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model('Page', pageSchema);
