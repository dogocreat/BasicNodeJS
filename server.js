var http = require("http");
var url = require("url");
var fs = require("fs");
var todoList = {};


function start(route, handle) {
    function onRequest(request, response) {
        request.setEncoding("utf8");
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        if (!pathname.indexOf('/favicon.ico')) {
            return;
        };


        request.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" +
                postDataChunk + "'.");
        });
        request.addListener("end", function () {
            route(handle, pathname,request,response, postData);
        });


    }
    http.createServer(onRequest).listen(8888);
    console.log("server is started");
}


exports.start = start;