const mongoose = require("mongoose");
const Joi = require("joi");
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Post Model
const Post = mongoose.model("Post", postSchema);
// Validate Create a new post
function validateCreatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    isPublished: Joi.boolean(),
  });
  return schema.validate(obj);
}
function validateUpdatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim(),
    content: Joi.string().trim(),
    id: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  Post,
  validateCreatePost,
  validateUpdatePost,
};
