const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookReviewSchema = new Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
  review: String
});

const BookReview = mongoose.model('BookReview', bookReviewSchema);

module.exports = BookReview;