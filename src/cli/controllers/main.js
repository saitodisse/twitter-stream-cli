import { CliController } from 'cli-router';
import Main from '../../main';

class Version extends CliController {
  index(params) {
    const main = new Main(params);
    return main.run();
  }
}

module.exports = Version;
