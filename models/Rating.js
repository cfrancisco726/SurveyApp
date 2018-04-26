const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new Schema({
  one: { type: Number, default: 0 },
  two: { type: Number, default: 0 },
  three: { type: Number, default: 0 },
  four: { type: Number, default: 0 },
  five: { type: Number, default: 0 },
});

module.exports = Rating;
