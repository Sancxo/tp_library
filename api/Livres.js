const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");

const image = req.body.image ?? "";
const title = req.body.title;
const des = req.body.description;
const idParam = req.params.id;
const idGenre = req.body.id_genre;
const idAuteur = req.body.id_auteur;

//CRUD Livres
router.get("/", (req, res) => {
  knex("livres")
  .join("ecrit", "livres.id_livres", "=", "ecrit.livres_id_livres")
  .join("auteur", "id_auteur", "=", "ecrit.auteur_id_auteur")
  .join("possede", "livres.id_livres", "=", "possede.livres_id_livres")
  .join("genre", "id_genre", "=", "possede.genre_id_genre")
  .select("livres.*", "auteur.prenom", "auteur.nom", "genre.libelle", "genre.genre_description")
  .select("livres.*", "auteur.prenom", "auteur.nom")
  .then((livres) => {
    res.json(livres);
  })
  .catch((err) => {
    console.error(err);
  });
});
router.get("/:id", (req, res) => {
  knex("livres")
  .select("livres.*", "auteur.prenom", "auteur.nom", "genre.libelle", "genre.genre_description")
  .where({ id_livres: idParam })
  .join("ecrit", "livres.id_livres", "=", "ecrit.livres_id_livres")
  .join("auteur", "id_auteur", "=", "ecrit.auteur_id_auteur")
  .join("possede", "livres.id_livres", "=", "possede.livres_id_livres")
  .join("genre", "id_genre", "=", "possede.genre_id_genre")
  .then((livre) => {
    res.json(livre);
  })
  .catch((err) => {
    console.error(err);
  });
});
router.post("/", (req, res) => {
  knex.transaction((trx) => {
    knex("livres")
    .transacting(trx)
    .insert({
      titre: title,
      livres_description: des,
      image: image
    })
    .then((response) => {
      let idLivre = response[0];
      return knex("ecrit")
      .transacting(trx)
      .insert({livres_id_livres: idLivre, auteur_id_auteur: idAuteur})
      .then(() => {
        return knex("possede")
        .transacting(trx)
        .insert({livres_id_livres: idLivre, genre_id_genre: idGenre});  
      })
    })
    .then(trx.commit)
    .catch(trx.rollback);
  })
  .then(() => {
    res.render("add-form", { success: `Nouveau livre créé : ${title}.` });
  })
  .catch((err) => {
    res.render("add-form", { error: `Le livre ${title} n'a pu être créé.` });
    console.error(err);
  });
});
router.put("/:id", (req, res) => {
  knex.transaction((trx) => {
    knex("livres")
    .transacting(trx)
    .update({
      titre: title,
      livres_description: des,
      image: image,
    })
    .where({ id_livres: idParam })
    .then(() => {
      return knex("ecrit")
      .transacting(trx)
      .update({auteur_id_auteur: idAuteur})
      .where({livres_id_livres: idParam})
      .then(() => {
        return knex("possede")
        .transacting(trx)
        .update({genre_id_genre: idGenre})
        .where({livres_id_livres: idParam})
      })
    })
    .then(trx.commit)
    .catch(trx.rollback);
  })
  .then(() => {
    res.render("add-form", { success: `Le livre n°${idParam} a bien été modifié !` });
  })
  .catch((err) => {
    res.render("add-form", { error: `Le livre n°${idParam} n'a pu être modifié.` });
    console.error(err);
  });
});
router.delete("/:id", (req, res) => {
  knex("livres")
    .delete()
    .where({ id_livres: idParam })
    .then(() => {
      res.render("add-form", { success: `Le livre n°${idParam} a bien été supprimé !` });
    })
    .catch((err) => {
      res.render("add-form", { error: `Le livre n°${idParam} n'a pu être supprimé.` });
      console.error(err);
    });
});

module.exports = router;
