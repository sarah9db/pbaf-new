const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  });


  const Comment = mongoose.model('Comment', CommentSchema)
  module.exports = Comment