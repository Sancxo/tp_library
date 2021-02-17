const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

const app = express();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
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
    })
    .then((user) => {
      if (user[0].length < 1) throw new Error();

      bcrypt.compare(password, user[0].password, (err, res) => {
        // Error
        if (!res) {
          throw new Error();
        }
      });
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
