const express = require("express");
const router = express.Router();
const UserLogin = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const saltRounds = 10;

// get employee profile
router.get("/:employee", (req, res, next) => {
    // return the company profile
  console.log("yuppppp front page");
  res.send("OK front page");
});

// update employee profile
router.put("/:employee", (req, res, next) => {
    // return the company profile
  console.log("yuppppp front page");
  res.send("OK front page");
});




module.exports = router;
