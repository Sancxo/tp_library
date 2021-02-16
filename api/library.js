const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");
<<<<<<< HEAD

// Test
let livre = new Livre("test", "test", "test");
console.log(livre);
=======
const Auteur = require('../Classes/Auteur');
const Genre = require("../Classes/Genre");
>>>>>>> c78c42a (classes importées dans library.js)

router.get("/livres", (req, res) => {
  knex
    .select()
    .table("Livres")
    .then((livres) => {
      res.json(livres);
    });
});

module.exports = router;
