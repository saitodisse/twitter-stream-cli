import Twit from 'twit';
import { merge } from 'lodash';
import BB from 'bluebird';

class Watcher {
  constructor(opts) {
    this._opts = merge({}, opts);
  }

  listen(formatter, saver, trackWords, languages) {
    // TODO: return a Rx.Observer
    return new BB.Promise((_resolve, _reject) => {
      const twit = new Twit({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.TOKEN,
        access_token_secret: process.env.TOKEN_SECRET,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
      });

      //
      // https://github.com/ttezel/twit#using-the-streaming-api
      //
      const stream = twit.stream('statuses/filter', {
        track: trackWords,
        language: languages
      });

      console.log('start watching for:', trackWords, 'in', languages, '-------------------');
      stream.on('tweet', (msg) => {
        if (formatter) {
          formatter.format([msg]).map((line) => console.log(line));
        } else {
          /**/console.log('\n>>---------\n msg:\n', /* -debug- */
          /**/require('util').inspect(msg, /* -debug- */
          /**/{ showHidden: false, depth: null, colors: true }), '\n>>---------\n');/* -debug- */
        }
        saver.save(trackWords, msg);
      });
    });
  }
}

export default Watcher;
