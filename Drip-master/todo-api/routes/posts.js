var express = require("express");
var router = express.Router();
const { Post, validate, validateComment } = require("../models/posts");
const { User } = require("../models/users");
const auth = require("../middleware/auth");
const _ = require("lodash");

router.get("/", async function (req, res, next) {
  const posts = await Post.find().sort("-createdAt");
  res.send(posts);
});

router.get("/:id", async function (req, res, next) {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("Post not found");
  res.send(post);
});

router.post("/", auth, async function (req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  let newPost = new Post({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    title: req.body.title,
    content: req.body.content,
  });

  newPost = await newPost.save();

  res.send(newPost);
});

router.put("/:id", auth, async function (req, res, next) {
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("Post not found");

  post.comments.push(req.body.comment);

  post = await post.save();

  res.send(post);
});

router.delete("/:id", auth, async function (req, res) {
  const post = await Post.findByIdAndRemove(req.params.id);
  if (!post) return res.status(404).send("Post not found");
  res.send("Post Deleted");
});

module.exports = router;
