const router = require("express").Router();

module.exports = db => {
  router.get("/transaction_types", (request, response) => {
    db.query(`SELECT * FROM transaction_types`).then(({ rows: transaction_types }) => {
      response.json(
        transaction_types.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  return router;
};
