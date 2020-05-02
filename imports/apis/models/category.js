const Joi = require("joi");
import { Mongo } from "meteor/mongo";

// const mongoose = require("mongoose");
// const categorySchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   meta: {
//     target_group: { type: String },
//     use_case: { type: String },
//     contact_person: { type: String },
//     link: { type: String },
//   },
// });
// const Category = mongoose.model("Category", categorySchema);

export const Category = new Mongo.Collection("Categories");

function validateCategory(category) {
  const schema = {
    title: Joi.string().max(50).required(),
    meta: {
      target_group: Joi.string(),
      use_case: Joi.string(),
      contact_person: Joi.string(),
      link: Joi.string(),
    },
  };

  return Joi.validate(category, schema);
}

exports.validate = validateCategory;
