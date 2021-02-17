const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Genre = require("../Classes/Genre");

//CRUD Genres
router.get("/", (req, res) => {
  knex("genre")
    .select()
    .then((genres) => {
      res.json(genres);
    })
    .catch((err) => {
      alert(err);
    });
});
router.get("/:id", (req, res) => {
  knex("genre")
    .select()
    .where({ id_genre: req.params.id })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      alert(err);
    });
});
router.post("/", (req, res) => {
  knex("genre")
    .insert({
      libelle: req.body.libelle,
      genre_description: req.body.genre_desc,
    })
    .then(() => {
      res.send("Nouveau genre créé : " + req.body.libelle);
    })
    .catch((err) => {
      alert(err);
    });
});
router.put("/:id", (req, res) => {
  knex("genre")
    .update({
      libelle: req.body.libelle,
      genre_description: req.body.genre_desc,
    })
    .where({ id_genre: req.params.id })
    .then(() => {
      res.send("Le genre n°" + req.params.id + " a bien été modifié !");
    })
    .catch((err) => {
      alert(err);
    });
});
router.delete("/:id", (req, res) => {
  knex("genre")
    .delete()
    .where({ id_genre: req.params.id })
    .then(() => {
      res.send("Le genre n°" + req.params.id + " a bien été supprimé");
    })
    .catch((err) => {
      alert(err);
    });
});

module.exports = router;
