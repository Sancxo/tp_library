const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

const Livre = require("../Classes/Livre");
const Auteur = require("../Classes/Auteur");
const Genre = require("../Classes/Genre");

//CRUD Livres
router.get("/livres", (req, res) => {
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
router.get("/livres/:id", (req, res) => {
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
router.post("/livres", (req, res) => {
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
router.put("/livres/:id", (req, res) => {
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
router.delete("/livres/:id", (req, res) => {
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

//CRUD Auteurs
router.get("/auteurs", (req, res) => {
  knex("auteur")
    .select()
    .then((auteurs) => {
      res.json(auteurs);
    })
    .catch((err) => {
      alert(err);
    });
});
router.get("/auteurs/:id", (req, res) => {
  knex("auteur")
    .select()
    .where({ id_auteur: req.params.id })
    .then((auteur) => {
      res.json(auteur);
    })
    .catch((err) => {
      alert(err);
    });
});
router.post("/auteurs", (req, res) => {
  knex("auteur")
    .insert({
      prenom: req.body.prenom,
      nom: req.body.nom,
    })
    .then(() => {
      res.send("Nouvel auteur créé : " + req.body.prenom + " " + req.body.nom);
    })
    .catch((err) => {
      alert(err);
    });
});
router.put("/auteurs/:id", (req, res) => {
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
      alert(err);
    });
});
router.delete("/auteurs/:id", (req, res) => {
  knex("auteur")
    .delete()
    .where({ id_auteur: req.params.is })
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
    })
    .catch((err) => {
      alert(err);
    });
});
router.get("/genres/:id", (req, res) => {
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
router.post("/genres", (req, res) => {
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
router.put("/genres/:id", (req, res) => {
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
router.delete("/genre/:id", (req, res) => {
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
