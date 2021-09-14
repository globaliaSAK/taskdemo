const mongoose = require("mongoose");
// const multer = reqiuer("multer")
const validator = require("validator");
const { Schema } = require("mongoose");
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

const postSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      PostMedia: {
         type: String,
         required: true,
      },
      comment: [{ type: Schema.Types.ObjectId, ref: "comment" }],
      user: { type: Schema.Types.ObjectId, ref: "users" },
   },
   {
      timestamps: true,
   }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
