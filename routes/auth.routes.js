const express = require("express");
const router = express.Router();
const UserLogin = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const saltRounds = 10;

router.get("/", (req, res, next) => {
  console.log("yuppppp front page");
  res.send("OK front page");
});

router.post("/signup", (req, res) => {
  const { firstName, lastName, email, password, accountRoll } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  UserLogin.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    accountRoll,
  })
    .then((createdUser) => {
      res.json({
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        accountRoll: createdUser.accountRoll,
        city: createdUser.city,
        state: createdUser.state,
        _id: createdUser._id,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserLogin.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.json({ err: "Invalid" });
      }
      const validPass = bcrypt.compareSync(password, foundUser.password);
      if (!validPass) {
        res.json({ err: "Invalid" });
        return;
      }
      console.log(foundUser)
      const payload = {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        accountRoll: foundUser.accountRoll,
        city: foundUser.city,
        state: foundUser.state,
        _id: foundUser._id,
      };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
        algorithm: "HS256",
      });
      res.json({ authToken });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: err });
    });
});

router.post("/logout", isAuthenticated, (req, res) => {
  // todo: need to perform some invalidation of the auth token
});

router.delete("/user", isAuthenticated, async (req, res) => {
  try {
    const { email, password } = req.body;
    await UserLogin.deleteOne({ email, password });
    // todo: need to perform some invalidation of the auth token
  } catch (e) {
    res.json({ error: e });
  }
});

router.get("/verify", isAuthenticated, async (req, res) => {
  console.log(req.payload)
  res.json(req.payload);
});

module.exports = router;
