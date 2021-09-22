require("dotenv").config("config.env");
const express = require("express");

const app = express();

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "this route does not existe in this API!  ",
  });
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`server running on port ${port} ...`);
});
