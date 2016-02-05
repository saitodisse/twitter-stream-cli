import path from 'path';
import chalk from 'chalk';

class MainCliRouter {
  createCli(opts) {
    const Cli = require('cli-router').Cli;

    opts.controllers_root = path.join(__dirname, './controllers');
    const cli = new Cli(opts);

    cli
      .route('help', (p, args) => p.help || p['--help'] || args.length === 0)
      .route('version', (p) => p.version || p['--version'])
      .route('main', (p, args) => args.length >= 0);

    const result = cli.run({ argv: process.argv.slice(2) });
    // _promise0 will check if it is a promise result
    if (result.hasOwnProperty('_promise0')) {
      return result
      .then((promiseResult) => process.exit(promiseResult))
      .catch((err) => {
        console.error(chalk.red(err.stack ? err.stack : err.toString()));
        process.exit(1);
      });
    }

    // no promise
    process.exit(0);
  }
}

export default MainCliRouter;
