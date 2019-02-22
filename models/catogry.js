const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catgorySchema = new Schema({
  name: String,

});

const Catgory = mongoose.model('Catgory', catgorySchema);

module.exports = Catgory;