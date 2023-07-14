const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todo = require("./routes/todo");
const port = 9500;
require("dotenv").config();
const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts");

mongoose
  .connect("mongodb://localhost/todo")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
  );
  res.header("Access-Control-Expose-Headers", "x-auth-token");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use(express.json());
app.use("/api/users", users);
app.use("/api/todo", todo);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log("listening on port " + port);
});
