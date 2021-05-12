require('dotenv').config();
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const cors = require("cors");
const helmet = require("helmet");
const pg = require("pg");
const PORT = process.env.PORT || 8080;

const users = require("./Routes/users");
const accounts = require("./Routes/accounts");
const categories = require("./Routes/categories");
const transactions = require("./Routes/transactions");
const transaction_types = require("./Routes/transaction_types");

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
};

const db = new pg.Client(config);

db
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(cors());
App.use(helmet());

App.use("/api", users(db));
App.use("/api", accounts(db));
App.use("/api", transactions(db));
App.use("/api", transaction_types(db));
App.use("/api", categories(db));

const server = App.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = App;