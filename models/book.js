const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  image:String,
  avgRate:Number,
  authId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author',}],
  catId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Catgory'}]

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;