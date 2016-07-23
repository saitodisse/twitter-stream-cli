import _ from 'lodash';

class Saver {
  constructor(opts) {
    this._opts = _.merge({}, opts);
  }

  save(db, trackWords, tweet) {
    // const tweetsRefPush = this.ref.child('itens');
    const ref = db.ref('tweets/' + trackWords);
    ref.push().set(tweet);
  }
}

export default Saver;

