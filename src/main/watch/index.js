import Twit from 'twit';
import { merge } from 'lodash';
import c from 'chalk';
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

      stream.on('connected', () => {
        console.error(c.gray.bold('connected'));
      });

      stream.on('disconnect', () => {
        stream.stop();
        console.error(c.gray.bold('disconnect'));
      });

      stream.on('reconnecting', (req, res, connectInterval) => {
        console.error(c.gray.bold('Got disconnected. Scheduling reconnect! statusCode:', res.statusCode, 'connectInterval', connectInterval));
      });

      stream.on('limit', (limitMsg) => {
        console.error(c.gray.bold('limit', limitMsg));
      });

      stream.on('error', (err) => {
        stream.stop();
        console.error(c.red.bold(err));
        observer.onError(err);
      });

      stream.on('parser-error', (err) => {
        stream.stop();
        console.error(c.red.italic(err.statusCode));
        console.error(c.red.italic(err.twitterReply));

        if (err.statusCode === 401) {
          console.error(c.red.bold('Please re-check your `.env` file'));
        }

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
