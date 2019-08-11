const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", (req, res) => {
  const users = User.find({}, (err, users) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(users);
    }
  });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the db
  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res.status(400).json({ message: "Email already exist" });

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  // Creating the new user
  const user = new User({
    name,
    email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // Validate data before login
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // Checking if the email exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Email not found" });

  const validaPass = await bcrypt.compare(password, user.password);
  if (!validaPass)
    return res.status(400).json({ message: "Password incorect!" });

  //Create and assing a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_ACCESS);
  res.header("auth-token", token).json({ token });
  //   res.send("Logged in!");
});

module.exports = router;
