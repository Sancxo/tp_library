const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");

//CRUD Livres
router.get("/", (req, res) => {
  knex("livres")
  .join("ecrit", "livres.id_livres", "=", "ecrit.livres_id_livres")
  .join("auteur", "id_auteur", "=", "ecrit.auteur_id_auteur")
  .join("possede", "livres.id_livres", "=", "possede.livres_id_livres")
  .join("genre", "id_genre", "=", "possede.genre_id_genre")
  .select("livres.*", "auteur.prenom", "auteur.nom", "genre.libelle", "genre.genre_description")
  .then((livres) => {
    res.json(livres);
  })
  .catch((err) => {
    alert(err);
  });
});
router.get("/:id", (req, res) => {
  knex("livres")
    .select()
    .where({ id_livres: req.params.id })
    .then((livre) => {
      res.json(livre);
    })
    .catch((err) => {
      alert(err);
    });
});
router.post("/", (req, res) => {
  knex("livres")
    .insert({
      titre: req.body.titre,
      livres_description: req.body.livre_desc,
      image: req.body.image,
    })
    .then(() => {
      res.send("Nouveau livre créé : " + req.body.titre + ".");
    })
    .catch((err) => {
      alert(err);
    });
});
router.put("/:id", (req, res) => {
  knex("livres")
    .update({
      titre: req.body.titre,
      livres_description: req.body.livre_desc,
      image: req.body.image,
    })
    .where({ id_livres: req.params.id })
    .then(() => {
      res.send("Le livre n°" + req.params.id + " a bien été modifié !");
    })
    .catch((err) => {
      alert(err);
    });
});
router.delete("/:id", (req, res) => {
  knex("livres")
    .delete()
    .where({ id_livres: req.params.id })
    .then(() => {
      res.send("Le livre n°" + req.params.id + " a bien été supprimé");
    })
    .catch((err) => {
      alert(err);
    });
});

module.exports = router;
