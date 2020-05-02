const Joi = require("joi");
import { Mongo } from "meteor/mongo";

export const Comment = new Mongo.Collection("Comments");

function validateComment(comment) {
  const schema = {
    content: Joi.string().required(),
    create_date: Joi.date(),
    author: Joi.object().required(),
  };
  return Joi.validate(comment, schema);
}

exports.validate = validateComment;
