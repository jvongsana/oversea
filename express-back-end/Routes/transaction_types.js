const router = require("express").Router();

module.exports = db => {
  router.get("/transaction_types", (request, response) => {
    db.query(`SELECT * FROM transaction_types`)
    .then((res) => {
      response.json(res.rows);
    } )
   
  });

  return router;
};


