const { response } = require("express");

const router = require("express").Router();

module.exports = db => {
  router.get("/accounts", (request, response) => {
    db.query(`SELECT * FROM accounts`)
    .then((res) => {
      response.json(res.rows);
    } )
   
  });
  
  router.post("/accounts", (request, response) => {
   console.log("server");
    const{name} = request.body;
    const values = [1,name];
    const queryString = `INSERT into accounts(user_id,name) VALUES($1,$2)`
    db.query(queryString,values)
    .then((res) => {
      response.status(201).send("Sucess");
      
    })
    .catch((err) => {
      response.status(500).send(err);
    });

  router.delete("/accounts/:id", (request, response) => {
    db.query(`DELETE FROM accounts WHERE id = $1::integer`, [
      request.params.id
    ])
    .then((res) => {
      response.status(201).send("success");
    })
    .catch((err) => {
      response.status(500).send(err);
    })
  });

  router.put("/accounts/:id", (request, response) => {
    const { name } = request.body;
    const { id } = request.params;
    db.query('UPDATE accounts SET name = $1::text WHERE id = $2::integer', [name, id])
  })
  .then((res) => {
    response.status(201).send("success");
  })
  .catch((err) => {
    response.status(500).send(err);
  });
  
     
    
  });

  return router;
};

