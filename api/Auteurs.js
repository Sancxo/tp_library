const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Auteur = require("../Classes/Auteur");

//CRUD Auteurs
router.get("/", (req, res) => {
  knex("auteur")
    .select()
    .then((auteur) => {
      res.json(auteur);
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
  let auteur;
  try {
    auteur = new Auteur(req.body.name, req.body.firstname);

    if (auteur.erreur.nom !== undefined) {
      throw auteur.erreur.nom.message;
    }
    if (auteur.erreur.prenom !== undefined) {
      throw auteur.erreur.prenom.message;
    }
  } catch (error) {
    res.render("add-form", { errorAuteur: error });
    console.error(error);
  }

  knex("auteur")
    .insert({
      prenom: auteur.prenom,
      nom: auteur.nom,
    })
    .then(() => {
      res.render("add-form", {
        successAuteur: `Auteur ajouté : ${auteur.getPrenom()} ${auteur.getNom()}.`,
      });
    })
    .catch((err) => {
      res.render("add-form", {
        successGenre: `Auteur: ${auteur.getPrenom()} ${auteur.getNom()} n'a pu être ajouté.`,
      });
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
