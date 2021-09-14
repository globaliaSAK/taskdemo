const express = require("express");
const router = express.Router();
const { comments, myComments } = require("../controller/comment.controller");
const auth = require("../middleware/auth");

router.post("/addcomments/:_id", auth, comments);
router.get("/mycomment", auth, myComments);

module.exports = router;
