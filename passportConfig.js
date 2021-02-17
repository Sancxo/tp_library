const LocalStrategy = require("passport-local").Strategy;
const knex = require("./db/knex");
const bcrypt = require("bcrypt");

const strategy = new LocalStrategy(function (username, password, done) {
  knex
    .select()
    .from("admin")
    .where({
      username: username,
    })
    .then((user) => {
      // Error
      if (user[0].length < 1) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      bcrypt.compare(password, user[0].password, (err, res) => {
        console.log(res);
        // Error
        if (!res) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }
      });

      // Good
      return done(null, user[0]);
    })
    .catch((err) => {
      // System or DB error
      return done(err);
    });
});

module.exports = strategy;
