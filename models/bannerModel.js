const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
  link: {
    type: String,
  },
  slide: {
    type: String,
  },
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
