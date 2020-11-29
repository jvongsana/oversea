const router = require("express").Router();

module.exports = db => {
  router.get("/categories", (request, response) => {
    const queryString = `
      SELECT * FROM categories;
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

  router.post("/categories", (request, response) => {
    const { name } = request.body;
    const queryString = `
      INSERT into categories(name) 
      VALUES($1)
      RETURNING id;
    `;
    const values = [name];
    db.query(queryString, values)
      .then((res) => {
        const id = res.rows[0].id;
        response.status(201).send(`${id}`);
      })
      .catch((err) => {
        response.status(500).send(err);
      });
  });

  router.put("/categories/:id", (request, response) => {
    const { id } = request.params;
    const { name } = request.body;

    const queryString = `
      UPDATE categories 
      SET name = $1::text 
      WHERE id = $2::integer;
    `;
    const values = [name, id];
    db.query(queryString, values)
      .then(() => {
        response.status(201).send(`Category updated with id: ${id}`);
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  router.delete("/categories/:id", (request, response) => {
    const { id } = request.params;

    const queryString = `
      DELETE FROM categories 
      WHERE id = $1::integer;
    `;
    const values = [id];
    db.query(queryString, values)
      .then(() => {
        response.status(201).send(`Category deleted with id: ${id}`);
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  return router;
};

