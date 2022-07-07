const { router } = require("./utils");

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
      name: Joi.string().required.min(2).max(30),
      link: Joi.string().required,
    }),
  }),
  createCard
);

router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({}),
  }),
  likeCard
);

router.delete("/cards/:cardId/likes", unlikeCard);
