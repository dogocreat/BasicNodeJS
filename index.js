var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

/**
 * Path Setting
 */
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/todo"] = requestHandlers.todo;

server.start(router.route,handle);