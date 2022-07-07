const { router } = require("./utils");
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.patch("/users/me", updateProfile);

router.patch("/users/me/avatar", updateAvatar);

router.get("/users/me", getMe);
