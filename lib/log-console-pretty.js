'use strict';

const _ = require('lodash');
const PrettyStream = require('bunyan-prettystream');

module.exports = function createStream(options) {
  const stream = new PrettyStream();
  stream.pipe(process.stderr);
  return _.defaults({
    type: 'raw',
    stream: stream
  }, options);
};
