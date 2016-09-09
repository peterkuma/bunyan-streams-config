Bunyan Streams Config
=====================

This package provides a function which creates a [bunyan](https://github.com/trentm/node-bunyan)
streams configuration from a simple JSON, i.e. one which can easily be exposed
in a configuration file and set by the end user without having to worry about
technical details of bunyan or node.

### Example

In a config file:

```json
"log": [
  {
    "type": "console-pretty",
    "level": "debug"
  },
  {
    "type": "file",
    "path": "app.log"
  }
]
```

in application:

```js
const bunyan = require('bunyan');
const bunyanStreamsConfig = require('bunyan-streams-config');
const config = // Load JSON config

const log = bunyan.createLogger({
  name: 'my-app',
  streams: bunyanStreamsConfig(config.log)
});

log.error("D'oh!");
```

would create two streams, one directed to the console (pretty-printed),
the other to a file.

bunyan-streams-config is similar to [bunyan-config](https://github.com/edappy/bunyan-config),
but with a few differences:

- you can add custom stream types as a second argument to `bunyanStreamsConfig`

- bunyan type of the stream is not exposed to the user (`raw` or other)

- serializers are not exposed to the user

- bunyan-streams-config provides 4 pre-defined stream types:
    `console`, `console-pretty`, `file`, `file-pretty`

Install
-------

    npm install bunyan-streams-config

API
---

### bunyanStreamsConfig(streams, options)

Create bunyan streams from JSON configuration.

- **streams** (Array): Array of streams, where stream is an object:

    - **type**: Stream type. One of pre-defined types (see below) or one in
        `options.streamTypes`.

    - *other*: Options passed to the stream type function.

- **options** (Object): Options:

    - **streamTypes** (Object): Custom stream types, where key is the stream
        type name and value is a function which creates the stream.

    - **defaults** (Object): Default properties passed to stream type functions.

The function throws an error if any stream type in `streams` is invalid.

Pre-defined Stream Types
------------------------

### console

Console/stderr stream (bunyan JSON objects).

### console-pretty

Console/stderr stream (pretty-printed with bunyan-prettystream).

### file

File stream (bunyan JSON objects). Options:

- **path**: Log file path.

### file-pretty

File stream (pretty-printed with bunyan-prettystream). Options:

- **path**: Log file path.

Custom Stream Types
-------------------

Custom stream types can be supported by supplying a function which creates
a bunyan stream.

Example:

`log-file.js`:

```js
'use strict';

const _ = require('lodash');

module.exports = function createStream(options) {
  return _.defaults({
    stream: process.stderr
  }, options);
};
```

in application:

```js
const log = bunyan.createLogger({
  name: 'my-app',
  streams: bunyanStreamsConfig(config.log, {
    streamTypes: {
      'file': require('log-file.js')
    }
  })
});
```

Some bunyan packages are suitable to be passed in `streamTypes` as is, e.g.:

```js
const log = bunyan.createLogger({
  name: 'my-app',
  streams: bunyanStreamsConfig(config.log, {
    streamTypes: {
      'seq': require('bunyan-seq').createStream
    }
  })
});
```

for logging to Seq. The output of the function should be an object normally
passed to `bunyan.createLogger` as an item of the `streams` array.

License
-------

Bunyan Streams Config is provided under the terms of the MIT license
(see [LICENSE.md](LICENSE.md)).
