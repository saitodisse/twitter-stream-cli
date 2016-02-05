#!/usr/bin/env node
require('source-map-support').install();
const path = require('path');
const MainCliRouter = require('../lib/src/cli/index');

const cli = new MainCliRouter({ path: path.join(__dirname, 'usage.txt') });

cli.run(process.argv.slice(2))
.then(output => {
  console.log(output);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
