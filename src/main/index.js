import dotenv from 'dotenv';
import Watcher from './watch';
import Saver from './saver';
import { merge } from 'lodash';
import ShortFormatter from './formatter/short';

class Main {
  constructor(opts) {
    this._opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  run() {
    const watcher = new Watcher();
    const formatter = new ShortFormatter();
    const saver = new Saver();

    const trackWords = this._opts.track;
    const languages = this._opts.lang;
    const willSendToFirebase = this._opts.send;
    /**/console.log('\n>>---------\n willSendToFirebase:\n', willSendToFirebase, '\n>>---------\n');/* -debug- */

    console.log('# watching for:', trackWords, 'in', languages, '-------------------');
    const watcher$ = watcher.listen(trackWords, languages)
    .map((tweet) => {
      if (tweet) {
        formatter.format([tweet]).map((line) => console.log(line));
        if (willSendToFirebase) {
          saver.save(trackWords, tweet);
        }
      }
    })
    .subscribe();

    return watcher$;
  }
}

export default Main;
