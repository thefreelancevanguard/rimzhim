const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { username, userId, postText, postDate } = req.body;

    const newPost = new Post({
      username: username,
      userId: userId,
      postText: postText,
      postDate: postDate,
    });

    newPost.postId = newPost._id;

    await newPost.save();
    res.status(200).json({ successMessage: "Posted Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error in creating post" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error can't get all posts." });
  }
};

const getAllPostOfUser = async (req, res) => {
  try {
    const { userId } = req.body.userData;
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getAllPostOfUser,
};
