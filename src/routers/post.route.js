const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { post, myPosts } = require("../controller/post.controller");
const { singleUpload } = require("../middleware/multer");

router.post("/addpost", singleUpload(), auth, post);
router.get("/mypost", auth, myPosts);

module.exports = router;
