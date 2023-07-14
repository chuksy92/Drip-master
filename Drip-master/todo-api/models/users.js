const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this.id, email: this.email, name: this.name },
    process.env.TODO_PK
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required().min(5).max(50),
    password: Joi.string().required().min(6),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validate;
