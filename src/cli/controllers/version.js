import { CliController } from 'cli-router';

class VersionController extends CliController {
  index() {
    const version = require('../../../../package.json').version;
    console.log('version: ' + version);
    return 0;
  }
}

export default VersionController;
