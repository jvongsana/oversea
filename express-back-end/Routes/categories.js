const router = require("express").Router();

module.exports = db => {
  router.get("/categories", (request, response) => {
    db.query(`SELECT * FROM categories`).then(({ rows: categories }) => {
      response.json(
        categories.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  return router;
};