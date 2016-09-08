'use strict';

const _ = require('lodash');

const BUILTIN_STREAM_TYPES = {
  'console': require('./log-console.js'),
  'console-pretty': require('./log-console-pretty.js'),
  'file': require('./log-file.js'),
  'file-pretty': require('./log-file-pretty.js'),
};

module.exports = function bunyanStreamsConfig(streams, options) {
  const streamTypes = _.defaults(
    {},
    _.get(options, 'streamTypes'),
    BUILTIN_STREAM_TYPES
  );

  const bunyanStreams = _.map(streams, stream => {
    const createStream = _.get(streamTypes, [stream.type]);
    if (!_.isFunction(createStream)) {
      throw new Error(`Invalid log stream type "${stream.type}"`);
    }
    const opts = _.defaults({}, _.omit(stream, 'type'));
    return createStream(opts);
  });

  return bunyanStreams;
};
