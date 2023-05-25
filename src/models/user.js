const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

  name: { type: String, required: true },
  age: { type: Number, required: true },
  title: { type: String, required: false },
  salary: { type: Number, required: false }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
