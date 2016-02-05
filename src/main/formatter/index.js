import c from 'chalk';
import { merge, reduce, map } from 'lodash';

class Formatter {
  constructor(opts) {
    this._opts = merge({}, opts);
  }

  _getHashTags(entities) {
    if (!entities) return '';
    if (!entities.hashtags) return '';

    const results = reduce(entities.hashtags, (prev, curr) => {
      return `${prev} ${c.italic.yellow('#')}${c.italic.yellow(curr.text)}`;
    }, '');

    return '\n ' + results;
  }

  _getUserMentions(entities) {
    if (!entities) return '';
    if (!entities.user_mentions) return '';

    const results = reduce(entities.user_mentions, (prev, curr) => {
      return `${prev} ${c.italic.green('@')}${c.italic.green(curr.screen_name)}`;
    }, '');

    return '\n ' + results;
  }

  _getUrls(entities) {
    if (!entities) return '';
    if (!entities.urls) return '';

    const results = reduce(entities.urls, (prev, curr) => {
      return `${prev} ${c.italic.blue('- ')}${c.italic.blue(curr.expanded_url)}\n`;
    }, '');

    return '\n ' + results;
  }

  format(jsonResults) {
    return map(jsonResults, (item) => {
      const dateFormated = new Date(item.created_at).toLocaleTimeString();
      const hashtags = this._getHashTags(item.entities);
      const userMentions = this._getUserMentions(item.entities);
      const urls = this._getUrls(item.entities);
      // output
      return (`${c.italic(dateFormated)} @${c.blue.bold(item.user.screen_name)} : ${c.gray(item.id, item.lang)}${hashtags}${userMentions}${urls}
  ${c.bold(item.text)}\n\n`);
    });
  }
}

export default Formatter;

