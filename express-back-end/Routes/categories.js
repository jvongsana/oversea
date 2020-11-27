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

  router.delete("/categories/:id", (request, response) => {
    db.query(`DELETE FROM categories WHERE id = $1::integer`, [
      request.params.id
    ])
    .then((res) => {
      response.status(201).send("success");
    })
    .catch((err) => {
      response.status(500).send(err);
    })
  });

  router.put("/categories/:id", (request, response) => {
    const { name } = request.body;
    const { id } = request.params;
    db.query('UPDATE categories SET name = $1::text WHERE id = $2::integer', [name, id])
  })
  .then((res) => {
    response.status(201).send("success");
  })
  .catch((err) => {
    response.status(500).send(err);
  });
  
  return router;
};

