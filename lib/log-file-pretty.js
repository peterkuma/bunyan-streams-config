'use strict';

const _ = require('lodash');
const fs = require('fs');
const PrettyStream = require('bunyan-prettystream');

module.exports = function createStream(options) {
  const stream = new PrettyStream({useColor: false});
  stream.pipe(fs.createWriteStream(options.path, {flags: 'a'}));
  return _.defaults({
    type: 'raw',
    stream: stream
  }, options);
};
