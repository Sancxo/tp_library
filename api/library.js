const express = require("express");

const router = express.Router();

const livresRouter = require("./Livres");
const auteursRouter = require("./Auteurs");
const genresRouter = require("./Genres");

router.use("/livres", livresRouter);
router.use("/auteurs", auteursRouter);
router.use("/genres", genresRouter);

module.exports = router;
