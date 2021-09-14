const Comment = require("../models/comment");
const User = require("../models/users");
const Post = require("../models/posts");

const comments = async (req, res) => {
   const _id = req.params._id;
   const comment = new Comment({
      ...req.body,
      userID: req.user._id,
      postID: _id,
   });

   try {
      await comment.save();

      const user = await User.findOneAndUpdate(
         { _id: req.user._id },
         { $push: { comment: comment._id } }
      );
      await user.save();

      const post = await Post.findOneAndUpdate(
         { _id: _id },
         { $push: { comment: comment._id } }
      );
      await post.save();
      res.status(201).send(comment);
   } catch (e) {
      res.status(400).send(e);
      console.log(e);
   }
};

const myComments = async (req, res) => {
   try {
      const comments = await Comment.find({ userID: req.user._id }).populate(
         "postID"
      );
      res.send(comments);
   } catch (error) {
      res.status(500).send(error);
   }
};

module.exports = { comments, myComments };
