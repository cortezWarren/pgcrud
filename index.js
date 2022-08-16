const express = require("express");
const app = express();
const controller = require("./controllers/controler");
require("dotenv").config();
const morgan = require("morgan");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT;

app.use(morgan("dev"));
app.set("view engine", "ejs");

controller(app);

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
