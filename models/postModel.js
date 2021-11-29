const moongose = require('mongoose');

const postSchema = new moongose.Schema({
  title: {
    type: String,
    required: [true, 'title can not be left blank'],
  },
  content:{
    type: String,
    required: [true, 'Content can not be left blank'],
  },
  comment: [String],
  like:{
      type: Number,
      default: 0
  }
});

const Post = moongose.model('Post', postSchema);
module.exports = Post;