import BB from 'bluebird';
import merge from 'lodash.merge';
import dotenv from 'dotenv';

class Main {
  constructor(opts) {
    this.opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  run() {
    return new BB.Promise((resolve, _reject) => {
      return resolve('TODO: Hello World');
    })
    .catch((err) => {
      console.error(err);
      return 1;
    });
  }
}

export default Main;
