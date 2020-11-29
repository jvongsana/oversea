const router = require("express").Router();

module.exports = db => {
  router.get("/transaction_types", (request, response) => {
    const queryString = `
      SELECT * FROM transaction_types;
    `;
    db.query(queryString)
      .then((res) => {
        response.json(res.rows);
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  return router;
};


