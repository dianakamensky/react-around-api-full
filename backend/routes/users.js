const { router, Joi, celebrate, validateURL } = require("./utils");
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getMe,
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
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  updateAvatar
);

router.get("/users/me", getMe);
