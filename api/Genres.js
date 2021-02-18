const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Genre = require("../Classes/Genre");
const Auteur = require("../Classes/Auteur");

//CRUD Genres
// Récup que les genres liés à un livre
router.get("/all", (req, res) => {
  knex("genre")
    .select()
    .then((genres) => {
      res.json(genres);
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/", (req, res) => {
  knex("genre")
    .select("genre.libelle", "livres.id_livres")
    .join("possede", "genre.id_genre", "=", "possede.genre_id_genre")
    .join("livres", "possede.livres_id_livres", "=", "livres.id_livres")
    .then((genres) => {
      res.json(genres);
    })
    .catch((err) => {
      console.error(err);
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
      console.error(err);
    });
});
router.post("/", (req, res) => {
  let genre;

  try {
    genre = new Genre(req.body.libelle, req.body.description);

    for (const error in genre.erreurs) {
      if (error !== undefined) {
        throw genre.erreurs[error].message;
      }
    }
  } catch (error) {
    res.render("add-form", { errorGenre: error });
    console.error(error);
  }

  knex("genre")
    .insert({
      libelle: genre.libelle,
      genre_description: genre.description,
    })
    .then(() => {
      res.render("add-form", {
        successGenre: `Genre ajouté : ${genre.getLibelle()}.`,
      });
    })
    .catch((err) => {
      res.render("add-form", { errorGenre: `Erreur : ${genre.getLibelle()}.` });
      console.error(err);
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
      console.error(err);
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
      console.error(err);
    });
});

module.exports = router;
