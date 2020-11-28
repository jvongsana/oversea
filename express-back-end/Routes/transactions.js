const { request, response } = require("express");

const router = require("express").Router();

module.exports = db => {
  router.get("/transactions", (request, response) => {
    db.query(`SELECT * FROM transactions`)
      .then((res) => {

        response.json(res.rows);
      });

  });

  router.post("/transactions", (request, response) => {
    const { category_id, account_id, transaction_type_id, payee, amount_cents, transaction_date } = request.body;
    const values = [category_id, account_id, transaction_type_id, payee, amount_cents, transaction_date];
    const queryString = `INSERT into transactions(category_id,account_id,transaction_type_id,payee,amount_cents,transaction_date) VALUES($1,$2,$3,$4,$5,$6)`;
    db.query(queryString, values)
      .then((res) => {
        response.status(201).send("success");
      })
      .catch((err) => {
        response.status(500).send(err);
      });
  });

  router.delete("/transactions/:id", (request, response) => {
    console.log('request.params.id :', request.params.id);
    db.query(`DELETE FROM transactions WHERE id = $1::integer`, [request.params.id])
      .then((res) => {
        response.status(201).send("success");
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  router.put("/transactions/:id", (request, response) => {
    const { payee, amount_cents, categoryID, transactionTypeID } = request.body;
    const { id } = request.params;
    const queryString = `
      UPDATE transactions 
      SET 
        payee = $1::text, 
        amount_cents = $2::integer, 
        category_id = $3::integer, 
        transaction_type_id = $4::integer
      WHERE id = $5::integer;
    `;
    db.query(queryString, [payee, amount_cents, categoryID, transactionTypeID, id])
      .then((res) => {
        response.status(201).send("success");
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send(err);
      });
  });

  return router;
};
