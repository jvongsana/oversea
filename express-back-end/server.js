const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Sample GET route
// App.get('/api/data', (req, res) => res.json({
//   message: "Seems to work!",
// }));

// App.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
// });

var pg = require('pg');

var conString = "postgres://kqhryvpu:y296u--82f7skYRkQfo2fHz5oiSg3S6L@otto.db.elephantsql.com:5432/kqhryvpu" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log("connected to elephant");
    // >> output: 2018-08-23T14:02:57.117Z
    //client.end();
  });
});