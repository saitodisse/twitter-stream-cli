import { CliController } from 'cli-router';
import { resolve } from 'bluebird';

class VersionController extends CliController {
  index() {
    const version = require('../../../../package.json').version;
    return resolve('version: ' + version);
  }
}

export default VersionController;
