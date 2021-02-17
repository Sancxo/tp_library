const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");

/* C'est plus ou moins ce qu'on veut dans chaque requête
  ca les rends un peu verbeuse mais lisible */

//CRUD Livres
router.post("/", (req, res) => {
  let livre;

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

  knex("livres")
    .insert({
      titre: livre.title,
      livres_description: livre.description,
      image: livre.image,
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
  knex("livres")
    .select()
    .then((livres) => {
      res.json(livres);
    })
    .catch((err) => {
      console.error(err);
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
      console.error(err);
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
      console.error(err);
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
      console.error(err);
    });
});

module.exports = router;
