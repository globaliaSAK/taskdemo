const e = require("express");
const User = require("../models/users");

const signUp = async (req, res) => {
   const user = new User(req.body);
   const username = req.body.username;
   const mobile = req.body.mobile;
   const email = req.body.email;
   try {
      const uname = await User.findOne({
         username: username,
      });
      if (!uname) {
         const phone = await User.findOne({
            mobile: mobile,
         });
         if (!phone) {
            const mail = await User.findOne({
               email: email,
            });
            if (!mail) {
               await user.save();
               const token = await user.generateAuthToken();
               res.status(201).send({ user, token });
            } else {
               res.status(400).send("email alredy in use");
            }
         } else {
            res.status(400).send(
               "please enter diffrent mobile number alredy exist"
            );
         }
      } else {
         res.status(400).send("username alredy in use please enter diffrent");
      }
   } catch (e) {
      res.status(400).send(e);
   }
};

const signIn = async (req, res) => {
   try {
      const user = await User.findByCredentials(
         req.body.email,
         req.body.password
      );
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
   } catch ({ message }) {
      res.status(400).send(message);
   }
};

const user = async (req, res) => {
   try {
      const user = await User.findOne({ _id: req.user._id }).populate(
         "posts comment"
      );
      res.status(200).send(user);
   } catch (error) {
      res.status(500).send(error);
   }
};

//allUser
const allUser = async (req, res) => {
   try {
      const user = await User.find().populate("posts comment");
      res.status(200).send(user);
   } catch (error) {
      res.status(500).send(error);
   }
};

// const users = async (req, res) => {
//    try {
//       const users = await User.find();
//       res.status(201).send(users);
//    } catch (e) {
//       res.status(400).send(e);
//       console.log(e);
//    }
// };

module.exports = { signUp, user, signIn, allUser };
