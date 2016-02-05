const dotenv = require('dotenv');
const Firebase = require('firebase');
const formatResults = require('./format_results');

// load .env file
dotenv.load({ silent: true });

// Get a database reference to our posts
const ref = new Firebase(process.env.FIREBASE_URL);
const postsRef = ref.child('tweets');

// Retrieve new posts as they are added to our database
postsRef.on('child_added', (snapshot, _prevChildKey) => {
  // each item
  const results = formatResults([snapshot.val()]);
  results.map((line) => console.log(line));
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.code);
  process.exit(1);
});
