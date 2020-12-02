const router = require("express").Router();

module.exports = db => {
  router.get("/transactions", (request, response) => {
    const queryString = `
      SELECT * FROM transactions;
    `;
    db.query(queryString)
      .then(res => {
        response.json(res.rows);
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  router.post("/transactions", (request, response) => {
    const { category_id, account_id, transaction_type_id, payee, amount_cents, transaction_date } = request.body;

    const queryString = `
      INSERT INTO transactions(category_id,account_id,transaction_type_id,payee,amount_cents,transaction_date) 
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [category_id, account_id, transaction_type_id, payee, amount_cents, transaction_date];
    db.query(queryString, values)
      .then(res => {
        const id = res.rows[0].id;
        response.status(201).send({id});
      })
      .catch((err) => {
        response.status(500).send(err);
      });
  });

  router.put("/transactions/:id", (request, response) => {
    const { id } = request.params;
    const { payee, amount_cents, categoryID, transactionTypeID } = request.body;
    const queryString = `
      UPDATE transactions 
      SET 
        payee = $1::text, 
        amount_cents = $2::integer, 
        category_id = $3::integer, 
        transaction_type_id = $4::integer
      WHERE id = $5::integer;
    `;
    const values = [payee, amount_cents, categoryID, transactionTypeID, id];
    db.query(queryString, values)
      .then(() => {
        response.status(201).send(`Transaction updated with id: ${id}`);
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  router.delete("/transactions/:id", (request, response) => {
    const { id } = request.params;

    const queryString = `
      DELETE FROM transactions 
      WHERE id = $1::integer;
    `;
    const values = [id];
    db.query(queryString, values)
      .then(() => {
        response.status(201).send(`Transaction deleted with id: ${id}`);
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  return router;
};
