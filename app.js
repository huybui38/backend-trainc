const express = require("express");
const path = require("path");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const api = require("./routes/index");
const { handleError } = require("./helpers/utils.helper");

var app = express();

app.use(cors({ origin: "http://192.168.1.14:3000", credentials: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", api);
app.use(function (req, res, next) {
    res.status(404).send("Unable to find the requested resource!");
});
app.use(handleError);
module.exports = app;
