const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");
const Auteur = require('../Classes/Auteur');
const Genre = require("../Classes/Genre");

router.get("/livres", (req, res) => {
  knex
    .select()
    .table("Livres")
    .then((livres) => {
      res.json(livres);
    });
});

module.exports = router;
