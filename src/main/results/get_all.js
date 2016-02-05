const dotenv = require('dotenv');
const request = require('superagent');
const formatResults = require('./format_results');

// load .env file
dotenv.load({ silent: true });

request
  .get(process.env.FIREBASE_URL + '/tweets.json')
  .set('Accept', 'application/json')
  .end((err, res) => {
    formatResults(res.body).map((line) => console.log(line));
  });
