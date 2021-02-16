const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

router.get("/livres", (req, res) => {
  knex
    .select()
    .table("Livres")
    .then((livres) => {
      res.json(livres);
    });
});

module.exports = router;
