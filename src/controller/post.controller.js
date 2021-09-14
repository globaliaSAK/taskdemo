const Post = require("../models/posts");
const User = require("../models/users");
const Comment = require("../models/comment");

const post = async (req, res) => {
   try {
      const file = req.file;
      const userPost = new Post({
         title: req.body.title,
         description: req.body.description,
         PostMedia: file.path,
         user: req.user._id,
      });

      await userPost.save();
      const updatedPost = await User.findOneAndUpdate(
         {
            _id: req.user._id,
         },
         {
            $push: {
               posts: userPost._id,
            },
         }
      );
      await updatedPost.save();
      res.status(201).send(userPost);
   } catch (e) {
      res.status(400).send(e);
      console.log(e);
   }
};

const myPosts = async (req, res) => {
   try {
      console.log(req.user._id);
      const post = await Post.find({ user: req.user._id }).populate("comment");
      const comment = await Comment.find({ UserID: req.user._id });

      res.status(201).send(post);
   } catch (error) {
      res.status(500).send(error);
   }
};

module.exports = { post, myPosts };
