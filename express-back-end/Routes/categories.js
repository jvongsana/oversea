const { request, response } = require("express");

const router = require("express").Router();

module.exports = db => {
  router.get("/categories", (request, response) => {
    db.query(`SELECT * FROM categories`)
    .then((res) => {
      response.json(res.rows);
    } )
   
  });

  router.post("/categories",(request,response) => {
    const{name} = request.body;
    const values = [name];
    const queryString = `INSERT into categories(name) VALUES($1)`
    db.query(queryString,values)
    .then((res) => {
      response.status(201).send("Success");
    })
    .catch((err) => {
      response.status(500).send(err);
    })
  });
  
  return router;
};

