const router = require("express").Router();

module.exports = db => {
  router.get("/users", (request, response) => {
    const queryString = `
      SELECT * FROM users;
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

