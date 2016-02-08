import dotenv from 'dotenv';
import Watcher from './watch';
import Saver from './saver';
import { merge } from 'lodash';
import Formatter from './formatter';
import c from 'chalk';

class Main {
  constructor(opts) {
    this._opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  run() {
    this.checkEnvs(this._opts.send);

    const watcher = new Watcher();
    const formatter = new Formatter(this._opts);

    const trackWords = this._opts.track;
    const languages = this._opts.lang;
    const willSendToFirebase = this._opts.send;

    console.error(c.gray('-----------------'));
    console.error('# Tracking tweets:', trackWords);
    console.error('# Languages:', languages);
    console.error(c.gray('-----------------'));

    return watcher.listen(trackWords, languages)
    .map((tweet) => {
      if (tweet) {
        formatter.format([tweet]).map((line) => console.log(line));
        if (willSendToFirebase) {
          const saver = new Saver();
          saver.save(trackWords, tweet);
        }
      }
    });
  }

  checkEnvs(willSend) {
    const checkValidContent = (envName) => {
      const envValue = process.env[envName];
      let isOk = true;
      if (typeof envValue === 'undefined') {
        console.error(c.red.italic(` - ${envName} is not set.`));
        isOk = false;
      }
      if (envValue.indexOf('__XXX__') >= 0) {
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
      console.error(c.gray('$ wget https://raw.githubusercontent.com/saitodisse/twitter-stream-cli/master/.env-example -O .env'));
      console.error(c.yellow('reff: https://github.com/saitodisse/twitter-stream-cli#configure-env-file'));
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
