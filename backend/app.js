const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./routes/utils");
require("dotenv").config();
const auth = require("./middleware/auth");
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
const { requestLogger, errorLogger } = require("./middleware/logger");
const { handleError } = require("./utils/errors");
const { login, createUser } = require("./controllers/users");
const { errors } = require("celebrate");
const { Joi, celebrate } = require("celebrate");
mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(requestLogger);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);
app.use(auth);
app.use("/", router);
require("./routes/cards");
require("./routes/users");
app.use(errorLogger);
app.use(errors());
router.get("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.use((err, req, res, next) => handleError(err, res));
app.listen(PORT, () => {});
