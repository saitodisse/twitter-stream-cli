import { merge } from 'lodash';
import JsonFormatter from './json';
import JsonFormattedFormatter from './json-formatted';
import JsonInspectFormatter from './json-inspect';
import LongFormatter from './long';
import ShortFormatter from './short';

class Formatter {
  constructor(opts) {
    this._opts = merge({}, opts);
    if (this._opts['json-formatted']) {
      this._formatterInstance = new JsonFormattedFormatter(this._opts);
    } else if (this._opts['json-inspect']) {
      this._formatterInstance = new JsonInspectFormatter(this._opts);
    } else if (this._opts.json) {
      this._formatterInstance = new JsonFormatter(this._opts);
    } else if (this._opts.long) {
      this._formatterInstance = new LongFormatter(this._opts);
    } else {
      this._formatterInstance = new ShortFormatter(this._opts);
    }
  }

  format(jsonResults) {
    return this._formatterInstance.format(jsonResults);
  }
}

export default Formatter;

