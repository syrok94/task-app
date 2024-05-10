const asyncHandler = require("express-async-handler");
const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
//@desc get user
//@route GET /user
//@access public

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("All fields mandatory !!");
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const expTime = 1000 * 60 * 60 * 60 * 24;

    const token = jwt.sign(
      { userId: user._id, username: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: expTime }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@desc create user
//@route POST /user
//@access public

const registerUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All Fiels are mandatory!");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).send("A user Already exist with this email !!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) res.status(201).json({ _id: user._id, email: user.email });

    console.log("User Register succesfully !!");
  } catch (err) {
    console.error("User not created!!", err);
    res.status(500).json({ message: "internal server error" });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  LoginUser,
  registerUser,
  currentUser,
};
