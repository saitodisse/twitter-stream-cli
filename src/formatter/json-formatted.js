import { merge, map } from 'lodash';

class JsonFormattedFormatter {
  constructor(opts) {
    this._opts = merge({}, opts);
    this._useColors = this._opts['no-color'] === false;
  }

  format(jsonResults) {
    return map(jsonResults, (item) => {
      return JSON.stringify(item, null, 2);
    });
  }
}

export default JsonFormattedFormatter;

