import c from 'chalk';
import { merge, reduce, map } from 'lodash';

class Formatter {
  constructor(opts) {
    this._opts = merge({}, opts);
  }

  _getHashTags(entities) {
    if (!entities || !entities.hashtags || entities.hashtags.length === 0) {
      return '';
    }
    const results = reduce(entities.hashtags, (prev, curr) => {
      return `${prev} ${c.italic.yellow('#')}${c.italic.yellow(curr.text)}`;
    }, '');
    return '\n ' + results;
  }

  _getUserMentions(entities) {
    if (!entities || !entities.user_mentions || entities.user_mentions.length === 0) {
      return '';
    }
    const results = reduce(entities.user_mentions, (prev, curr) => {
      return `${prev} ${c.italic.green('@')}${c.italic.green(curr.screen_name)}`;
    }, '');
    return '\n ' + results;
  }

  _getUrls(entities) {
    if (!entities || !entities.urls || entities.urls.length === 0) {
      return '';
    }
    const results = reduce(entities.urls, (prev, curr) => {
      return `${prev} ${c.italic.blue('- ')}${c.italic.blue(curr.expanded_url)}`;
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
      return [
        `@${c.blue.bold(item.user.screen_name)}`,
        ` : ${c.gray.italic(item.id)} (${c.gray.italic(item.lang)}) ${c.gray.italic(dateFormated)}`,
        `${hashtags}`,
        `${userMentions}`,
        `${urls}`,
        `\n${c.bold(item.text)}\n\n`
      ].join('');
    });
  }
}

export default Formatter;

