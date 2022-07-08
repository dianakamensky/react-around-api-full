const { Joi, celebrate, validateURL } = require("./utils");
const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getMe,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/me", getMe);

router.get("/:id", getUser);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  updateAvatar
);

module.exports = router;
