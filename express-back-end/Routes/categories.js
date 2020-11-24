const router = require("express").Router();

module.exports = db => {
  router.get("/categories", (request, response) => {
    db.query(`SELECT * FROM categories`)
    .then((res) => {
      console.log(res.rows);
      response.json(res.rows);
    } )
   
  });

  return router;
};

