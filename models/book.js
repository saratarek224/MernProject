const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  image:String,
  avgRate:Number,
  authId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'author', required: true }],
  catId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catgory', required: true }]

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;