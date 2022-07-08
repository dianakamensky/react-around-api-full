const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");
const { createToken } = require("../utils/jwt");
const notFound = new NotFoundError("User not found");

function getUsers(req, res, next) {
  User.find({}).then(res.send).catch(next);
}

function _getUser(id, res, next) {
  User.findById(id)
    .orFail(notFound)
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function getUser(req, res, next) {
  return _getUser(req.params.id, res);
}

function getMe(req, res, next) {
  return _getUser(req.user._id, res);
}

function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then(res.send)
    .catch(next);
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(notFound)
    .then(res.send)
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(notFound)
    .then(res.send)
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError());
      }
      if (bcrypt.compare(password, user.password)) {
        const token = createToken(user._id);
        res.send({ token });
      } else return Promise.reject(new UnauthorizedError());
    })
    .catch(next);
}

module.exports = {
  getUsers,
  getUser,
  getMe,
  createUser,
  updateAvatar,
  updateProfile,
  login,
};
