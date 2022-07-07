const { NotFoundError, UnauthorizedError } = require("../utils/errors");
const Card = require('../models/card');

const notFound = new NotFoundError('Card not found');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findByIdAndRemove(req.params.id)
    .orFail(notFound)
    .then((card) => res.send({ data: card }))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(notFound)
    .then((card) => res.send({ data: card }))
    .catch(next);
}

function unlikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(notFound)
    .then((card) => res.send({ data: card }))
    .catch(next);
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
};
