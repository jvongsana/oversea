const router = require("express").Router();

module.exports = db => {
  router.get("/accounts", (request, response) => {
    const queryString = `
      SELECT * FROM accounts;
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

  router.post("/accounts", (request, response) => {
    const { name } = request.body;

    const queryString = `
      INSERT INTO accounts(user_id,name) 
      VALUES($1,$2) 
      RETURNING id;
    `;
    const values = [1, name];
    db.query(queryString, values)
      .then((res) => {
        const id = res.rows[0].id;
        response.status(201).send(`${id}`);
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  router.put("/accounts/:id", (request, response) => {
    const { id } = request.params;
    const { name } = request.body;

    const queryString = `
      UPDATE accounts 
      SET name = $1::text 
      WHERE id = $2::integer;
    `;
    const values = [name, id];
    db.query(queryString, values)
      .then(() => {
        response.status(201).send(`Account updated with id: ${id}`);
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  router.delete("/accounts/:id", (request, response) => {
    const { id } = request.params;

    const queryString = `
      DELETE FROM accounts 
      WHERE id = $1::integer;
    `;
    const values = [id];
    db.query(queryString, values)
      .then(() => {
        response.status(201).send(`Account deleted with id: ${id}`);
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  return router;
};

