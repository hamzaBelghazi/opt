const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'this category alredy exist!'],
  },
  link: {
    type: String,
  },
  categoryImage: {
    type: String,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
