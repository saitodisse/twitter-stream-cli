import { CliControllers } from 'cli-router';
import { resolve } from 'bluebird';

class HelpController extends CliControllers.Help {
  index(params, cli) {
    const usage = super.index(params, cli);
    return resolve(usage);
  }
}

export default HelpController;
