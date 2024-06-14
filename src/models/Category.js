const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Esse campo é necessário.'
  },
  image: {
    type: String,
    required: 'Esse campo é necessário.'
  },
});

module.exports = mongoose.model('Category', categorySchema);
