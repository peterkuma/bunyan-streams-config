'use strict';

const _ = require('lodash');

module.exports = function createStream(options) {
  return _.defaults({
    type: 'file'
  }, options);
};
