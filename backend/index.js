const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.route.js");
const app = express();

let database;

const connection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://mustafa_tola:KG01A2JRLTv5BeD1@cluster0.xbmy6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then((db) => {
      console.log("Connected to Mongo");
      database = db;
    })
    .catch((err) => {
      console.log("Error occured = ", err.reason);
    });
};
connection();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/users", userRoute);

const port = process.env.PORT | 4000;
const server = app.listen(port, () => {
  console.log("Connected to port ", port);
});

module.exports = database;
