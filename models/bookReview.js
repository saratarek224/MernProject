const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookReviewSchema = new Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }],
  bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true }],
  review:String

});

const BookReview = mongoose.model('BookReview', BookReviewSchema);

module.exports = BookReview;