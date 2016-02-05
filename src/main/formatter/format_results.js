const _ = require('lodash');
const c = require('chalk');

const getHashTags = (entities) => {
  if (!entities) return '';
  if (!entities.hashtags) return '';

  const results = _.reduce(entities.hashtags, (prev, curr) => {
    return `${prev} ${c.italic.yellow('#')}${c.italic.yellow(curr.text)}`;
  }, '');

  return '\n ' + results;
};

const getUserMentions = (entities) => {
  if (!entities) return '';
  if (!entities.user_mentions) return '';

  const results = _.reduce(entities.user_mentions, (prev, curr) => {
    return `${prev} ${c.italic.green('@')}${c.italic.green(curr.screen_name)}`;
  }, '');

  return '\n ' + results;
};

const getUrls = (entities) => {
  if (!entities) return '';
  if (!entities.urls) return '';

  const results = _.reduce(entities.urls, (prev, curr) => {
    return `${prev} ${c.italic.blue('- ')}${c.italic.blue(curr.expanded_url)}
`;
  }, '');

  return '\n ' + results;
};

module.exports = (jsonResults) => {
  return _.map(jsonResults, (item) => {
    const dateFormated = new Date(item.created_at).toLocaleTimeString();
    const hashtags = getHashTags(item.entities);
    const userMentions = getUserMentions(item.entities);
    const urls = getUrls(item.entities);
    // output
    return (`${c.italic(dateFormated)} @${c.blue.bold(item.user.screen_name)} : ${c.gray(item.id, item.lang)}${hashtags}${userMentions}${urls}
  ${c.bold(item.text)}

`);
  });
};
