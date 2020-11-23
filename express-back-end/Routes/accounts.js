const router = require("express").Router();

module.exports = db => {
  router.get("/accounts", (request, response) => {
    db.query(`SELECT * FROM accounts`).then(({ rows: accounts }) => {
      response.json(
        accounts.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  return router;
};
