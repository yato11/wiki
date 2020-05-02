const Joi = require("joi");
import { Mongo } from "meteor/mongo";

// const teamSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: { type: String },
// });
// const Team = mongoose.model("Team", teamSchema);
export const Team = new Mongo.Collection("Teams");

function validatePage(team) {
  const schema = {
    title: Joi.string().max(20).required(),
    description: Joi.string().max(1000),
  };

  return Joi.validate(team, schema);
}

exports.validate = validatePage;
