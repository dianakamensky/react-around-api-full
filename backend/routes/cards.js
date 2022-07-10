const { Joi, celebrate } = require("celebrate");
const router = require("express").Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
} = require("../controllers/cards");

router.get("/", getCards);

router.delete(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().required().min(24).max(24),
    }),
  }),
  deleteCard
);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }),
  createCard
);

router.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().required().min(24).max(24),
    }),
  }),
  likeCard
);

router.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().required().min(24).max(24),
    }),
  }),
  unlikeCard
);

module.exports = router;
