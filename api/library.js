const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");
const Auteur = require('../Classes/Auteur');
const Genre = require("../Classes/Genre");

router.get("/livres", (req, res) => {
  knex("livres")
  .select()
  .then((livres) => {
    res.json(livres);
  });
});
router.get("/livres/:id", (req, res) => {
  knex("livres")
  .select()
  .where({id_livres: req.params.id})
  .then((livres) => {
    res.json(livres);
  });
});

router.post("/livres", (req, res) => {
  knex("livres")
  .insert({
    titre: req.body.titre, 
    livres_description: req.body.livre_desc, 
    image: req.body.image})
  .then(() => {
    res.send('Nouveau livre créé : ' + req.body.titre + '.');
  });
})

router.put("/livres/:id", (req, res) => {
  knex("livres")
  .update({
    titre: req.body.titre,
    livres_description: req.body.livre_desc,
    image: req.body.image
  })
  .where({id_livres: req.params.id})
  .then((livres) => {
    res.send('Le livre n°' + req.params.id + ' a bien été modifié !');
  });
})

router.delete("/livres/:id", (req, res) => {
  knex("livres")
    .delete()
    .where({id_livres: req.params.id})
    .then(() => {
      res.send('livre n°' + req.params.id + ' a bien été supprimé');
    });
})

module.exports = router;
