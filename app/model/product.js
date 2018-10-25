const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1
  },
  name: {
    type: String,
    minlength: 1,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    minlength: 1
  },
  price: {
    default: true,
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
