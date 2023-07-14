const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access Denied, no token provided");

  try {
    const decoded = jwt.verify(token, process.env.TODO_PK);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
