const dotenv = require('dotenv');
const Firebase = require('firebase');
const Twitter = require('node-tweet-stream');

// load .env file
dotenv.load({ silent: true });

// configure firebase
const ref = new Firebase(process.env.FIREBASE_URL);
const postsRef = ref.child('tweets');

const t = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
});

t.on('tweet', (tweet) => {
  console.log(`(${tweet.lang}) [@${tweet.user.screen_name}]`);
  postsRef.push().set(tweet);
});

t.on('error', (err) => {
  console.log('Oh no', err);
});

console.log('languages = [\'en\', \'pt\']');
t.language('pt');
t.language('en');

console.log('tracking: docker');
t.track('docker');
