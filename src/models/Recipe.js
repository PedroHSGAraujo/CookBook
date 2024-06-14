const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Esse campo é necessário.'
  },
  description: {
    type: String,
    required: 'Esse campo é necessário.'
  },
  email: {
    type: String,
    required: 'Esse campo é necessário.'
  },
  ingredients: {
    type: Array,
    required: 'Esse campo é necessário.'
  },
  category: {
    type: String,
    enum: ['Thailandesa', 'Americana', 'Chinesa', 'Mexicana', 'Indiana', 'Espanhola'],
    required: 'Esse campo é necessário.'
  },
  image: {
    type: String,
    required: 'Esse campo é necessário.'
  },
});

module.exports = mongoose.model('Recipe', recipeSchema);