const LocalStrategy = require("passport-local").Strategy;
const knex = require("./db/knex");

const strategy = new LocalStrategy(function (username, password, done) {
  knex
    .select()
    .table("admin")
    .where({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      if (user.password !== password) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

module.exports = strategy;
