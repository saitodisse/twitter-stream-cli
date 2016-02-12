import { merge, map } from 'lodash';

class JsonFormatter {
  constructor(opts) {
    this._opts = merge({}, opts);
  }

  format(jsonResults) {
    return map(jsonResults, (item) => {
      return JSON.stringify(item);
    });
  }
}

export default JsonFormatter;

