const router = require("express").Router();

module.exports = db => {
  router.get("/transactions", (request, response) => {
    db.query(`SELECT * FROM transactions`).then(({ rows: transactions }) => {
      response.json(
        transactions.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  return router;
};
