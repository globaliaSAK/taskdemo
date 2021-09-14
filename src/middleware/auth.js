const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Post = require("../models/posts");
const Comment = require("../models/comment");

const auth = async (req, res, next) => {
   try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, "iamsagarkachariya");
      req.body = { ...req.body, ...decoded };
      const user = await User.findOne({
         _id: decoded._id,
         "tokens.token": token,
      });

      if (!user) {
         throw new Error();
      }
      req.token = token;
      req.user = user;

      next();
      // console.log(token)
   } catch (e) {
      res.status(401).send({ error: "please enter valid token in header" });
      console.log(e);
   }
};

module.exports = auth;
