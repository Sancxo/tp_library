const express = require("express");
const router = express.Router();

const session = require("express-session");

router.get("/form", function (req, res, next) {
  if (req.session.loggedInUser) {
    res.render("add-form");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
