const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const users = require("./Routes/users");
const accounts = require("./Routes/accounts");
const categories = require("./Routes/categories");
const transactions = require("./Routes/transactions");
const transaction_types = require("./Routes/transaction_types");
const db = require("./db");
const cors = require("cors");
const helmet = require("helmet");
const bodyparser = require("body-parser");

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

//Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

 
  
module.exports = function application() {
  App.use(cors());
  App.use(helmet());
  App.use(bodyparser.json());
  App.use("/api", users(db));
  App.use("/api", accounts(db));
  App.use("/api", transactions(db));
  App.use("/api", transaction_types(db));
  App.use("/api", categories(db));

  App.close = function() {
    return db.end();
  };

  return App;
}


  


App.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});