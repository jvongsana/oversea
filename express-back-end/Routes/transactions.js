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
    const{category_id,account_id,transaction_type_id,payee,amount_cents} = request.body;
    const values = [category_id,account_id,transaction_type_id,payee,amount_cents];
    const queryString = `INSERT into transactions(category_id,account_id,transaction_type_id,payee,amount_cents) VALUES($1,$2,$3,$4,$5)`
    db.query(queryString,values)
    .then((res) => {
      response.status(201).send("success");
    })
    .catch((err) => {
      response.status(500).send(err);
    })
  });

  return router;
};
