const { Joi, celebrate, validateURL } = require("./utils");
const router = require("express").Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
} = require("../controllers/cards");

router.get("/", getCards);

router.delete("/:id", deleteCard);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard
);

router.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required(),
    }),
  }),
  likeCard
);

router.delete("/:cardId/likes", unlikeCard);

module.exports = router;
