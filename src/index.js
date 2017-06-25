"use strict";

require("babel-core/register")({});
require("babel-polyfill");

const settings = require("./config");
const server = require("./server").default;
global.navigator = { userAgent: 'all' };

server.listen(settings.client.port, function () {
  console.log("web_www_react's server listening on: " + settings.client.port);
});
