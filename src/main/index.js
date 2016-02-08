import dotenv from 'dotenv';
import Watcher from './watch';
import Saver from './saver';
import { merge } from 'lodash';
import Formatter from './formatter';

class Main {
  constructor(opts) {
    this._opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  run() {
    const watcher = new Watcher();
    const formatter = new Formatter(this._opts);
    const saver = new Saver();

    const trackWords = this._opts.track;
    const languages = this._opts.lang;
    const willSendToFirebase = this._opts.send;

    console.error('# watching for:', trackWords, 'in', languages, '-------------------');
    return watcher.listen(trackWords, languages)
    .map((tweet) => {
      if (tweet) {
        formatter.format([tweet]).map((line) => console.log(line));
        if (willSendToFirebase) {
          saver.save(trackWords, tweet);
        }
      }
    });
  }
}

export default Main;
