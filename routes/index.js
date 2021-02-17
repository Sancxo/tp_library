const express = require("express");
const router = express.Router();

router.get("/index", function (req, res, next) {
  if (req.session.loggedInUser) {
    res.render("index", { username: req.session.username });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
