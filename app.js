const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const library = require("./api/library");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes for html files
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/books", booksRouter);

// Routes for API calls
app.use("/api", library);

module.exports = app;
