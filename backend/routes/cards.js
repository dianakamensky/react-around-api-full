const { router, Joi, celebrate, validateURL } = require("./utils");

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);

router.delete("/cards/:id", deleteCard);

router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard
);

router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required(),
    }),
  }),
  likeCard
);

router.delete("/cards/:cardId/likes", unlikeCard);
