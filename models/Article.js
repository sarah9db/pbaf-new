// models/Article.js
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Content: { type: String, required: true },
  Images: { type: String },
  Hyperlinks: { type: String },
  unique_id: {} , // Reference to User model
  tags: {type: [String]},
  comments: {type: [Object]},
  author: {type: [String]}
  });

module.exports = mongoose.model('Article', ArticleSchema);
