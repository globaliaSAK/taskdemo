const express = require("express");
require("./db/connection");
const userRouter = require("./routers/user.route");
const postRouter = require("./routers/post.route");
const commentRouter = require("./routers/comment.route");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

app.listen(port, () => {
   console.log(`server is up on port ${port}`);
});
