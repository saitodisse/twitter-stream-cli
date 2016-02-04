#!/usr/bin/env node
require('source-map-support').install();
const path = require('path');
const MainCliRouter = require('../lib/src/cli/index');

const cli = new MainCliRouter();
cli.createCli({ path: path.join(__dirname, 'usage.txt') });
