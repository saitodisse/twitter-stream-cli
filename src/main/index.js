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

    console.log('# watching for:', trackWords, 'in', languages, '-------------------');
    const watcher$ = watcher.listen(trackWords, languages)
    .map((tweet) => {
      if (tweet) {
        formatter.format([tweet]).map((line) => console.log(line));
        saver.save(trackWords, {
          user: tweet.user.screen_name,
          text: tweet.text,
          link: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
        });
      }
    })
    .subscribe();

    return watcher$;
  }
}

export default Main;
