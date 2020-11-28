const { request, response } = require("express");

const router = require("express").Router();

module.exports = db => {
  router.get("/transactions", (request, response) => {
    db.query(`SELECT * FROM transactions`)
    .then((res) => {
      
      response.json(res.rows);
    } )
   
  });

  router.post("/transactions", (request,response) => {
    const{category_id,account_id,transaction_type_id,payee,amount_cents,transaction_date} = request.body;
    const values = [category_id,account_id,transaction_type_id,payee,amount_cents,transaction_date];
    const queryString = `INSERT into transactions(category_id,account_id,transaction_type_id,payee,amount_cents,transaction_date) VALUES($1,$2,$3,$4,$5,$6)`
    db.query(queryString,values)
    .then((res) => {
      response.status(201).send("success");
    })
    .catch((err) => {
      response.status(500).send(err);
    })
  });

  router.delete("/transactions/:id", (request, response) => {
    db.query(`DELETE FROM transactions WHERE id = $1::integer`, [
      request.params.id
    ])
    .then((res) => {
      response.status(201).send("success");
    })
    .catch((err) => {
      response.status(500).send(err);
    })
  });

  // router.put("/transactions/:id", (request, response) => {
  //   const { name, category_id, account_id, transaction_type_id,payee,amount_cents,transaction_date } = request.body;
  //   const { id } = request.params;
  //   db.query('UPDATE transactions SET name = $1::text, category_id = $2::integer, account_id = $3::integer, transaction_type_id = $4::integer, payee= $5::text, amount_cents = $6::text, transaction_date = $7::date WHERE id = $8::integer', [name,category_id,account_id,transaction_type_id,payee,amount_cents,transaction_date, id])
  // })
  // .then((res) => {
  //   response.status(201).send("success");
  // })
  // .catch((err) => {
  //   response.status(500).send(err);
  // });

  

  return router;
};
