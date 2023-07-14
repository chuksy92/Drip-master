const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const toDoSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        reuired: true,
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
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ToDo = mongoose.model("ToDo", toDoSchema);

function validate(toDo) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(toDo);
}

exports.ToDo = ToDo;
exports.validate = validate;
