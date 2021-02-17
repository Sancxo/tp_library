const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");

// Routes
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login-route");
const logoutRouter = require("./routes/logout");

const library = require("./api/library");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "123456cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// Routes for html files
app.use("/", loginRouter);
app.use("/", indexRouter);
app.use("/", logoutRouter);

// Routes for API calls
app.use("/api", library);

module.exports = app;
