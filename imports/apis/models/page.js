const Joi = require("joi");
import { Mongo } from "meteor/mongo";

// const pageSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   content: { type: String, required: true },
//   team: { type: String, required: true },
//   category: {
//     // _id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
//     _id: { type: String, required: true },
//     title: { type: String, required: true },
//     meta: {
//       target_group: { type: String, required: true },
//       use_case: { type: String, required: true },
//       contact_person: { type: String, required: true },
//       link: {
//         type: String,
//         validate: {
//           validator: function (v) {
//             if (this.title.trim() == "Tool") {
//               return v.trim() == "";
//             }
//             return true;
//           },
//           message: " this field is required !",
//         },
//       },
//     },
//   },
//   metadata: { type: String, required: true },
//   create_date: { type: Date, default: Date.now() },
//   author: { type: String, required: true },
// });

// const Page = mongoose.model("Page", pageSchema);

export const Page = new Mongo.Collection("Pages");

export function validatePage(page) {
  const schema = {
    title: Joi.string().max(50).required(),
    content: Joi.string().required(),
    team: Joi.string().required(),
    category: {
      // _id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      _id: Joi.string().required(),
      title: Joi.string().required(),
      meta: {
        target_group: Joi.string().required(),
        use_case: Joi.string().required(),
        contact_person: Joi.string().required(),
        link: Joi.string(),
      },
    },
    metadata: Joi.string().max(1000).required(),
    create_date: Joi.date().default(function () {
      return new Date();
    }, "current date"),
    author: Joi.object().required(),
  };

  return Joi.validate(page, schema);
}
