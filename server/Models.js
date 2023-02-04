const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      roles : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'roles'
      }
});
  
  module.exports = mongoose.model('Person', PersonSchema);