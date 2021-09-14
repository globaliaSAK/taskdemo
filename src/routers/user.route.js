const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
   signUp,
   user,
   signIn,
   allUser,
} = require("../controller/user.controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/user", auth, user);
router.get("/allUsers", allUser);

module.exports = router;
