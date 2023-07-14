var express = require("express");
var router = express.Router();
const { User, validate } = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async function (req, res, next) {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send("This email has already been registered");
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
});

module.exports = router;
