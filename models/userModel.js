const moongose = require('mongoose');

const userSchema = new moongose.Schema({
  fname: {
    type: String,
    required: [true, 'Name can not be left blank'],
  },
  lname:{
    type: String,
    required: [true, 'Name can not be left blank'],
  },
  email: {
    type: String,
    required: [true, 'email is must !!'],
    unique: true,
  },
});

const User = moongose.model('User', userSchema);
module.exports = User;