const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  knex
    .select()
    .from("admin")
    .where({
      username: username,
      password: password,
    })
    .then((user) => {
      if (user[0].length < 1) throw new Error();
      req.session.loggedInUser = true;
      req.session.username = username;
      res.redirect("/index");
    })
    .catch((err) => {
      res.render("login", {
        alertMsg: "Mot de passe ou nom d'utilisateur incorrect",
      });
    });
});

module.exports = router;
