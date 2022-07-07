const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");
const { createToken } = require("../utils/jwt");
const notFound = new NotFoundError("User not found");

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
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
    .then((user) => res.send({ data: user }))
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
    .then((user) => res.send({ data: user }))
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
    .then((user) => res.send({ data: user }))
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
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError());
      }
      const token = createToken(user._id);
      res.send({ token });
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
