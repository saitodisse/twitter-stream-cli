import dotenv from 'dotenv';
import Watcher from '../watch';
import { merge } from 'lodash';
import c from 'chalk';

class Main {
  constructor(opts) {
    this._opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  run() {
    this.checkEnvs(this._opts.send);
    const watcher = new Watcher();
    const trackWords = this._opts.track;
    const languages = this._opts.lang;
    return watcher.listen(trackWords, languages);
  }

  checkEnvs(willSend) {
    const checkValidContent = (envName) => {
      const envValue = process.env[envName];
      let isOk = true;
      if (typeof envValue === 'undefined') {
        console.error(c.red.italic(` - ${envName} is not set.`));
        isOk = false;
      } else if (typeof envValue === 'string' && envValue.indexOf('__XXX__') >= 0) {
        console.error(c.red.italic(` - error: ${envName} still have __XXX__ template.`));
        isOk = false;
      }
      return isOk;
    };

    const isValid = checkValidContent('CONSUMER_KEY') ||
      checkValidContent('CONSUMER_SECRET') ||
      checkValidContent('TOKEN') ||
      checkValidContent('TOKEN_SECRET') ||
      (willSend && checkValidContent('TOKEN_SECRET'));

    if (!isValid) {
      console.error(c.gray('--------------------------------------------------'));
      console.error(c.yellow('You have to create an `.env` file with valid content before continue.'));
      console.error(c.yellow('You can execute the command bellow then edit your `.env` file:'));
      console.error(c.gray(''));
      console.error(c.gray('$ wget https://raw.githubusercontent.com/saitodisse/twitter-stream-cli/master/.env-example -O .env'));
      console.error(c.gray(''));
      console.error(c.yellow('Check this link for more info: https://github.com/saitodisse/twitter-stream-cli#configure-env-file'));
      process.exit(1);
    }
    // const stat = Rx.Observable.fromNodeCallback(fs.stat);
    // const source = stat('.env');
    // return source.subscribe(
    //   () => {
    //     console.log('Next: success!');
    //   },
    //   (err) => {
    //     console.log('Error: ' + err);
    //   },
    //   () => {
    //     console.log('Completed');
    //   });
  }
}

export default Main;
