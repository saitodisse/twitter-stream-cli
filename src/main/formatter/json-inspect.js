import { merge, map } from 'lodash';
import { inspect } from 'util';

class JsonInspectFormatter {
  constructor(opts) {
    this._opts = merge({}, opts);
    this._useColors = this._opts['no-color'] === false;
  }

  format(jsonResults) {
    return map(jsonResults, (item) => {
      return inspect(item, { showHidden: false, depth: null, colors: this._useColors });
    });
  }
}

export default JsonInspectFormatter;

