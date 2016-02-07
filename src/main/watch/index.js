import Twit from 'twit';
import { merge } from 'lodash';
import Rx from 'rx';

class Watcher {
  constructor(opts) {
    this._opts = merge({}, opts);
  }

  listen(trackWords, languages) {
    // Twit.stream is converted to a Rx.Observable
    const watcher$ = Rx.Observable.create((observer) => {
      const twit = new Twit({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.TOKEN,
        access_token_secret: process.env.TOKEN_SECRET,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
      });

      // https://github.com/ttezel/twit#using-the-streaming-api
      const stream = twit.stream('statuses/filter', {
        track: trackWords,
        language: languages
      });

      stream.on('tweet', (msg) => {
        observer.onNext(msg);
      });

      stream.on('error', (err) => {
        observer.onError(err);
      });

      return () => {
        stream.stop();
      };
    });

    return watcher$;
  }
}

export default Watcher;
