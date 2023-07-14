const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Joi = require("joi");
const { valid } = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const postSchema = new Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 50,
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 50,
      },
    }),
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = new mongoose.model("Posts", postSchema);

function validate(post) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  return schema.validate(post);
}

function validateComment(comment) {
  const schema = Joi.object({
    comment: Joi.string().required(),
  });
  return schema.validate(comment);
}

exports.Post = Post;
exports.validate = validate;
exports.validateComment = validateComment;
