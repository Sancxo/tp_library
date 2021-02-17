const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");

/* C'est plus ou moins ce qu'on veut dans chaque requête
  ca les rends un peu verbeuse mais lisible */

//CRUD Livres
router.post("/", (req, res) => {
  // Ici on vient récupérer les variables plus facile a utiliser et si les req.body changent
  // pas besoin d'aller les chercher partout
  const image = req.body.image ?? "";
  const title = req.body.title;
  const des = req.body.description;

  knex("livres")
    .insert({
      titre: title,
      livres_description: des,
      image: image,
    })
    .then(() => {
      // la fonction render vient de node et comme dans app j'ai spécifié un template engine
      // il va a chaque chercher dans views le nom du fichier indiqué et en second paramêtre
      // passer des variables
      res.render("add-form", { success: `Nouveau livre créé : ${title}.` });
    })
    .catch((err) => {
      // en cas d'erreur on render avec une variable erreur easy
      res.render("add-form", { error: `Le livre ${title} n'a pu être créé.` });

      // Ca c'est plutôt pour le développement, en production tu mets un package qui écrit des logs
      // pour enregistrer les erreurs
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
