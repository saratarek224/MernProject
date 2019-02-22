const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    dateOfBirth:Date,
    image:String,

});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;