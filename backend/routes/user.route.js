const mongoose = require("mongoose");
const express = require("express");
const userSchema = require("../models/user/User");
const db = require("../index");
let router = express.Router();

router.route("/createUser").post(async (req, res, next) => {
  let user = {};
  userSchema.find({ email: req.body.email }, (err, user) => {
    user = user;
  });
  console.log(user);
  if (user.length > 0) {
    res.json({msg:"User already exists"});
    return next("User exists");
  }
  else {
    userSchema.create(req.body, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log(data);
        res.json({data:data,msg:"User created"});
      }
    });
  }
});

module.exports = router;
