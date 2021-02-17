const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Auteur = require("../Classes/Auteur");

//CRUD Auteurs
router.get("/", (req, res) => {
  knex("auteur")
    .select()
    .then((auteurs) => {
      res.json(auteurs);
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/:id", (req, res) => {
  knex("auteur")
    .select()
    .where({ id_auteur: req.params.id })
    .then((auteur) => {
      res.json(auteur);
    })
    .catch((err) => {
      console.error(err);
    });
});
router.post("/", (req, res) => {
  knex("auteur")
    .insert({
      prenom: req.body.prenom,
      nom: req.body.nom,
    })
    .then(() => {
      res.send("Nouvel auteur créé : " + req.body.prenom + " " + req.body.nom);
    })
    .catch((err) => {
      console.error(err);
    });
});
router.put("/:id", (req, res) => {
  knex("auteur")
    .update({
      nom: req.body.nom,
      prenom: req.body.prenom,
    })
    .where({ id_auteur: req.params.id })
    .then(() => {
      res.send("L'auteur n°" + req.params.id + " a bien été modifié !");
    })
    .catch((err) => {
      console.error(err);
    });
});
router.delete("/:id", (req, res) => {
  knex("auteur")
    .delete()
    .where({ id_auteur: req.params.is })
    .then(() => {
      res.send("L'auteur n°" + req.params.id + " a bien été supprimé");
    });
});

module.exports = router;
