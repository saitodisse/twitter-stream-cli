import dotenv from 'dotenv';
import Watcher from './watch';
import Formatter from './formatter';
import ShortFormatter from './formatter/short';
import Saver from './saver';
import { merge } from 'lodash';

class Main {
  constructor(opts) {
    this._opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  run() {
    const watcher = new Watcher();
    const formatter = new ShortFormatter();
    const saver = new Saver();
    return watcher.listen(formatter, saver, this._opts.track);
  }
}

export default Main;
