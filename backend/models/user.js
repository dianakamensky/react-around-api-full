const mongoose = require("mongoose");

const linkregex = /https?:\/\/(www\.)?\S+/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorer",
  },
  avatar: {
    type: String,
    default: "../avatar.jpg",
    validate: {
      validator(v) {
        return v.match(linkregex);
      },
      message: "Please enter a valid url",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
