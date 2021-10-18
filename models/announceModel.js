const mongoose = require('mongoose');

const announceSchema = mongoose.Schema(
  {
    announceText: {
      type: String,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model('Announce', announceSchema);
