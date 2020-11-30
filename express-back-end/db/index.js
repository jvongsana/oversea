const pg = require("pg");
const client = new pg.Client({
  connectionString: "postgres://kqhryvpu:y296u--82f7skYRkQfo2fHz5oiSg3S6L@otto.db.elephantsql.com:5432/kqhryvpu"
});

client
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;