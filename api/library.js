const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");

// Test
let livre = new Livre("test", "test", "test");
console.log(livre);

router.get("/livres", (req, res) => {
  knex
    .select()
    .table("Livres")
    .then((livres) => {
      res.json(livres);
    });
});

module.exports = router;
