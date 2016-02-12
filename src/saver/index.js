import _ from 'lodash';
const Firebase = require('firebase');

class Saver {
  constructor(opts) {
    this._opts = _.merge({}, opts);
    // TODO: change this so we can receive FIREBASE_URL as cli option
    this.ref = new Firebase(process.env.FIREBASE_URL);
  }

  save(trackWords, tweet) {
    const tweetsRef = this.ref.child('tweets');

    const itemPath = _.camelCase(trackWords.join(' '));
    const itemRef = tweetsRef.child(itemPath);

    itemRef.push().set(tweet);
  }
}

export default Saver;

