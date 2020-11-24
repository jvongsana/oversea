const { request } = require("express");

const router = require("express").Router();

module.exports = db => {
  router.get("/transactions", (request, response) => {
    db.query(`SELECT * FROM transactions`)
    .then((res) => {
      console.log(res.rows);
      response.json(res.rows);
    } )
   
  });

  return router;
};
