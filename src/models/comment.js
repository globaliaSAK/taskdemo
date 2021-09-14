const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const commentSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      userID: {
         type: Schema.Types.ObjectId,
         ref: "users",
      },
      postID: {
         type: Schema.Types.ObjectId,
         ref: "post",
      },
   },
   {
      timestamps: true,
   }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
