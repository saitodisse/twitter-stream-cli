import dotenv from 'dotenv';
import Watcher from './watch';
import Formatter from './formatter';
import { merge } from 'lodash';

class Main {
  constructor(opts) {
    this._opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  run() {
    const watcher = new Watcher();
    const formatter = new Formatter();
    return watcher.listen(formatter);
  }
}

export default Main;
