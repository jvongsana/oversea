require('dotenv').config();
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const users = require("./Routes/users");
const accounts = require("./Routes/accounts");
const categories = require("./Routes/categories");
const transactions = require("./Routes/transactions");
const transaction_types = require("./Routes/transaction_types");
// const db = require("./db");
const cors = require("cors");
const helmet = require("helmet");
const bodyparser = require("body-parser");
const pg = require("pg");

//connecting to databse
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  databse: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT

};

const db = new pg.Client(config);

db
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));
  

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(cors());
App.use(helmet());
App.use(bodyparser.json());

//Sample GET route
App.use("/api", users(db));
App.use("/api", accounts(db));
App.use("/api", transactions(db));
App.use("/api", transaction_types(db));
App.use("/api", categories(db));

const server = App.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});


module.exports= App;