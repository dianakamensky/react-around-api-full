const { router, Joi, celebrate, validateUrl } = require("./utils");
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);

router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateUrl),
    }),
  }),
  updateAvatar
);

router.get("/users/me", getMe);
