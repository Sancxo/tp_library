const express = require("express");
const router = express.Router();

const session = require("express-session");

const app = express();

router.get("/index", function (req, res, next) {
  if (req.session.loggedInUser) {
    res.render("index", { username: req.session.username });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
