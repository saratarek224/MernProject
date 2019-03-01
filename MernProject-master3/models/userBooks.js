const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBookSchema = new Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
  rate:Number,
  status:[{type: String, enum: ['Read', 'Want To Read', 'Currently Reading']}] ,

});

const UserBook = mongoose.model('UserBook', userBookSchema);

module.exports = UserBook; 