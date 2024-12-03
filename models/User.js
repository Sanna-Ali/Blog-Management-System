const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
UserSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

// Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET);
};

// User Model
const User = mongoose.model("User", UserSchema);
// Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}
module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
};
