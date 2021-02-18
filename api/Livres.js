const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");

//CRUD Livres
router.post("/", (req, res) => {
  let livre,
    authors = [],
    genres = [];

  for (const key in req.body) {
    if (key.startsWith("author")) {
      let id = req.body[key].match(/^\d/)[0];

      authors.push({ auteur_id_auteur: id });
    }
    if (key.startsWith("genre")) {
      let id = req.body[key].match(/^\d/)[0];

      genres.push({ genre_id_genre: id });
    }
  }

  try {
    livre = new Livre(req.body.title, req.body.description, req.body.image);

    for (const error in livre.erreurs) {
      if (error !== undefined) {
        throw livre.erreurs[error].message;
      }
    }
  } catch (error) {
    res.render("add-form", { errorLivre: error });
    console.error(error);
  }

  knex
    .transaction((trx) => {
      knex("livres")
        .transacting(trx)
        .insert({
          titre: livre.title,
          livres_description: livre.description,
          image: livre.image,
        })
        .then((response) => {
          let idLivre = response[0];

          authors.forEach((author) => {
            author.livres_id_livres = idLivre;
          });
          return knex("ecrit")
            .transacting(trx)
            .insert(authors)
            .then(() => {
              genres.forEach((genre) => {
                genre.livres_id_livres = idLivre;
              });

              return knex("possede").transacting(trx).insert(genres);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(() => {
      res.render("add-form", {
        successLivre: `Nouveau livre créé : ${livre.getTitle()}.`,
      });
    })
    .catch((err) => {
      res.render("add-form", {
        errorLivre: `Le livre ${livre.getTitle()} n'a pu être créé.`,
      });

      console.error(err);
    });
});

router.get("/", (req, res) => {
  knex
    .select("livres.id_livres AS ID")
    .select("livres.titre AS Titre")
    .select("livres.livres_description AS Description")
    .select("livres.image")
    .select("auteur.prenom AS Prénom", "auteur.nom as Nom")
    .select("genre.libelle AS Genre")
    .from("livres")
    .join("ecrit", "livres.id_livres", "=", "ecrit.livres_id_livres")
    .join("auteur", "ecrit.auteur_id_auteur", "=", "auteur.id_auteur")
    .join("possede", "livres.id_livres", "=", "possede.livres_id_livres")
    .join("genre", "possede.genre_id_genre", "=", "genre.id_genre")
    .then((livres) => {
      res.json(livres);
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/:id", (req, res) => {
  knex("livres")
    .select("livres.*", "auteur.prenom", "auteur.nom", "genre.libelle")
    .where({ id_livres: req.params.id })
    .join("ecrit", "livres.id_livres", "=", "ecrit.livres_id_livres")
    .join("auteur", "auteur.id_auteur", "=", "ecrit.auteur_id_auteur")
    .join("possede", "livres.id_livres", "=", "possede.livres_id_livres")
    .join("genre", "genre.id_genre", "=", "possede.genre_id_genre")
    .then((livre) => {
      console.log(livre);
      res.json(livre);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.put("/:id", (req, res) => {
  knex
    .transaction((trx) => {
      knex("livres")
        .transacting(trx)
        .update({
          titre: title,
          livres_description: des,
          image: image,
        })
        .where({ id_livres: req.params.id })
        .then(() => {
          return knex("ecrit")
            .transacting(trx)
            .update({ auteur_id_auteur: idAuteur })
            .where({ livres_id_livres: req.params.id })
            .then(() => {
              return knex("possede")
                .transacting(trx)
                .update({ genre_id_genre: idGenre })
                .where({ livres_id_livres: req.params.id });
            });
        })

        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(() => {
      res.render("add-form", {
        success: `Le livre n°${req.params.id} a bien été modifié !`,
      });
    })
    .catch((err) => {
      res.render("add-form", {
        error: `Le livre n°${req.params.id} n'a pu être modifié.`,
      });
      console.error(err);
    });
});
router.delete("/:id", (req, res) => {
  const idParam = req.params.id;
  knex.transaction((trx) => {
    knex("livres")
    .transacting(trx)
    .delete()
    .where({ id_livres: req.params.id })
    .then(() => {
      res.render("add-form", {
        successDeleteLivre: `Le livre n°${req.params.id} a bien été supprimé !`,
      });
    })
    .catch((err) => {
      res.render("add-form", {
        errorDeleteLivre: `Le livre n°${req.params.id} n'a pu être supprimé.`,
      });

      console.error(err);
    });
  });
});

module.exports = router;
