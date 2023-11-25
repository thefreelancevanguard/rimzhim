require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const {
  createPost,
  getAllPost,
  getAllPostOfUser,
} = require("./controllers/postController");
const {
  createUser,
  loginUser,
  getUser,
  getUserById,
  updateUser,
} = require("./controllers/userController");

// Connecting Database by calling connectDB function
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const PORT = process.env.PORT || 8000;

// User Routes
app.post("/signup", createUser);
app.post("/login", loginUser);
app.post("/getuserbyid", getUserById);
app.get("/getuser", getUser);
app.patch("/update-user", updateUser);

// Post Routes
app.post("/create-post", createPost);
app.get("/get-all-posts", getAllPost);
app.post("/get-allpost-of-user", getAllPostOfUser);

app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
