const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");
const Auteur = require("../Classes/Auteur");
const Genre = require("../Classes/Genre");

//CRUD Livres
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
  .then((livre) => {
    res.json(livre);
  });
});

router.post("/livres", (req, res) => {
  knex("livres")
  .insert({
    titre: req.body.titre, 
    livres_description: req.body.livre_desc, 
    image: req.body.image
  })
  .then(() => {
    res.send("Nouveau livre créé : " + req.body.titre + ".");
  });
});

router.put("/livres/:id", (req, res) => {
  knex("livres")
  .update({
    titre: req.body.titre,
    livres_description: req.body.livre_desc,
    image: req.body.image
  })
  .where({id_livres: req.params.id})
  .then(() => {
    res.send("Le livre n°" + req.params.id + " a bien été modifié !");
  });
});

router.delete("/livres/:id", (req, res) => {
  knex("livres")
    .delete()
    .where({id_livres: req.params.id})
    .then(() => {
      res.send("Le livre n°" + req.params.id + " a bien été supprimé");
    });
});


//CRUD Auteurs
router.get("/auteurs", (res, res) => {
  knex("auteur")
  .select()
  .then((auteurs) => {
    res.json(auteurs);
  });
});
routeur.get("/auteurs/:id", (req, res) => {
  knex("auteur")
  .select()
  .where({id_auteur: req.params.id})
  .then((auteur) => {
    res.json(auteur)
  });
});

routeur.post("/auteurs", (req, res) => {
  knex("auteur")
  .insert({
    prenom: req.body.prenom,
    nom: req.body.nom
  })
  .then(() => {
    res.send("Nouvel auteur créé : " + req.body.prenom + " " + req.body.nom);
  })
});
routeur.put("/auteurs/:id", (req, res) => {
  knex("auteur")
  .update({
    nom: req.body.nom,
    prenom: req.body.prenom
  })
  .where({id_auteur: req.params.id})
  .then(() => {
    res.send("L'auteur n°" + req.params.id + " a bien été modifié !")
  });
});
routeur.delete("/auteurs/:id", (req,res) => {
  knex("auteur")
  .delete()
  .where({id_auteur: req.params.is})
  .then(() => {
    res.send("L'auteur n°" + req.params.id + " a bien été supprimé");
  });
});

//CRUD Genres
router.get("/genres", (req, res) => {
  knex("genre")
  .select()
  .then((genres) => {
    res.json(genres);
  });
});
router.get("/genres/:id", (req, res) => {
  knex("genre")
  .select()
  .where({id_genre: req.params.id})
  .then((genre) => {
    res.json(genre);
  });
});
router.post("/genres", (req, res) => {
  knex("genre")
  .insert({
    libelle: req.body.libelle,
    genre_description: req.body.genre_desc
  })
  .then(() => {
    res.send("Nouveau genre créé : " + req.body.libelle);
  });
});
router.put("/genres/:id", (req, res) => {
  knex("genre")
  .update({
    libelle: req.body.libelle,
    genre_description: req.body.genre_desc
  })
  .where({id_genre: req.params.id})
  .then(() => {
    res.send("Le genre n°" + req.params.id + " a bien été modifié !");
  });
});
router.delete("/genre/:id", (req,res) => {
  knex("genre")
  .delete()
  .where({id_genre: req.params.id})
  .then(() => {
    res.send("Le genre n°" + req.params.id + " a bien été supprimé");
  })
});
module.exports = router;
