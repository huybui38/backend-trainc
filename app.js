const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/usersApi.router");
const usersAdminRouter = require("./routes/usersApiAdmin.router");
const coursesAdminRouter = require("./routes/coursesApiAdmin.router");
require("dotenv").config();
var app = express();
const { getDB } = require("./app/db");
const { get } = require("http");

app.use(cors());
require("./app/db")();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/admin/users", usersAdminRouter);
app.use("/admin/courses", coursesAdminRouter);

module.exports = app;
