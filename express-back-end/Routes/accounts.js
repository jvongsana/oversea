const router = require("express").Router();

module.exports = db => {
  router.get("/accounts", (request, response) => {
    db.query(`SELECT * FROM accounts`)
    .then((res) => {
      response.json(res.rows);
    } )
   
  });

  return router;
};

