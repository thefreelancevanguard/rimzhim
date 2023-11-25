const User = require("../models/User");
const bcrypt = require("bcrypt");
// const { generateJWT } = require("../utils/generateJWT");
const { generateJWT, decodeAuthToken } = require("../utils/jwtFunctions");
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body.userData;

    console.log(req.body.userData);
    // Hash Password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name: name,
      email: email.toLowerCase(),
      password: hashPassword,
    });

    newUser.userId = newUser._id;

    // Generate JWT token
    const authToken = await generateJWT(newUser._id, name, email);
    newUser.authToken = authToken;

    await newUser.save();
    res.status(200).json({
      successMessage: "User Created Successfully",
      authToken: authToken,
      username: name,
      email: email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error in creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
    const foundUser = await User.findOne({ email: email });

    bcrypt.compare(password, foundUser.password, (err, result) => {
      if (!err && result === true) {
        const user = {
          name: foundUser.name,
          email: foundUser.email,
          authToken: foundUser.authToken,
          _id: foundUser._id,
        };
        res.status(200).json(user);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Server Error" });
  }
};

// Get Userr by authToken
const getUser = async (req, res) => {
  try {
    const authToken = req.headers["authtoken"];

    if (!authToken) {
      // No token provided, return an error
      return res.status(401).json({ message: "No token provided" });
    }

    // Split the header to get the actual token (remove "Bearer" keyword)
    const token = authToken.split(" ")[1];

    const user = await decodeAuthToken(token);
    console.log("Decoded User");
    // console.log(user);
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.body.userData;

    const foundUser = await User.findOne({ _id: id });
    if (!foundUser) {
      res.status(404).json({ errorMessage: "User Not Found" });
    }

    const user = {
      _id: foundUser._id,
      authToken: foundUser.authToken,
      name: foundUser.name,
      email: foundUser.email,
      number: foundUser?.number,
      profileImg: foundUser?.profileImg,
      about: foundUser?.about,
    };
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, name, number, about, profileImage } = req.body.userData;
    // console.log(req.body.userData);

    const foundUser = await User.findOne({ _id: _id });
    if (!foundUser) {
      res.status(404).json({ errorMessage: "User Not Found!" });
      return;
    }

    foundUser.name = name;
    foundUser.number = number;
    foundUser.about = about;
    foundUser.profileImg = profileImage;

    await foundUser.save();

    res.status(200).json({ successMessage: "User is updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "User can't be updated!" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  getUserById,
  updateUser,
};
