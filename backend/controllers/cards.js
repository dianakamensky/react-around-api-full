const { NotFoundError, UnauthorizedError, ForbiddenError } = require("../utils/errors");
const Card = require('../models/card');

const notFound = new NotFoundError('Card not found');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.id)
    .orFail(notFound)
    .then((card) => {
      if (card.owner === req.user._id) {
        Card.deleteOne({ _id: card._id })
          .then((card) => res.send({ data: card }))
      } else {
        throw new ForbiddenError("Card does not belong to user");
      }
    })
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
