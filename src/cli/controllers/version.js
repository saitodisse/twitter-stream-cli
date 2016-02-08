import { CliController } from 'cli-router';
import Rx from 'rx';

class VersionController extends CliController {
  index() {
    const version = require('../../../../package.json').version;
    return Rx.Observable.of('version: ' + version);
  }
}

export default VersionController;
