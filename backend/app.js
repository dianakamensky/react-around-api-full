const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./routes/utils");
require("dotenv").config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "629b8ecc3e174874c0ec0334",
  };

  next();
});

mongoose.connect("mongodb://localhost:27017/aroundb");

app.listen(PORT, () => {});
app.use("/", router);
require("./routes/cards");
require("./routes/users");

router.get("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
