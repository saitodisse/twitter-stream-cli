import { CliControllers } from 'cli-router';

export default class Help extends CliControllers.Help {
  index(params, cli) {
    const usage = super.index(params, cli);
    console.log(usage);
    return 0;
  }
}
