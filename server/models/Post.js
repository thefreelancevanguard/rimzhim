const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  postDate: {
    type: String,
    required: true,
  },
});

const Post = new mongoose.model("post", postSchema);

module.exports = Post;
