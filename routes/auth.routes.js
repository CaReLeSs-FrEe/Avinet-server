const express = require('express');
const router = express.Router();
const UserLogin = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10

router.get("/", (req, res, next) => {
    console.log('yuppppp')
    // res.send("whats uppppp");
  });

  router.post('/signup', (req, res) => {
    const {firstName, lastName, email, password, accountRoll} = req.body
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    UserLogin.create({firstName, lastName, email, password: hashedPassword, accountRoll}).then(createdUser => res.json({message: createdUser})).catch(err => console.log(err))
  });
  
  router.post('/login', (req, res) => {
    const {email, password} = req.body
    UserLogin.findOne({email}).then(foundUser => {
        if(!foundUser) {
        res.json({err: 'Invalid'})
        return;
    }
    const validPass = bcrypt.compareSync(password, foundUser.password)
    if(!validPass) {
        res.json({err: 'Invalid'})
        return;
  
    }
    const payload = {email: foundUser, _id: foundUser._id}
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:"24h", algorithm: "HS256"})
    res.json({authToken})
}).catch((err) => console.log(err));
  });

  module.exports = router;