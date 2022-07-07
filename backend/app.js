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
mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(requestLogger);
app.post("/signin", login);
app.post("/signup", createUser);
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
