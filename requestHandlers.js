var qs = require("querystring");
var fs = require("fs");
var url = require("url");
var bodyParser = require("body-parser");
var todoList = [];
var count = 0;


/**
 * Default index.html
 */
function start(request, response, postData) {
  fs.readFile('./index.html', function (err, html) {
    if (err) {
      throw err;
    }
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(html);
    response.end();
  });

}

function upload(request, response, postData) {
  console.log("Request handler 'upload' was called.");
}

function todo(request, response, postData) {
  if ("POST" === request.method.toUpperCase()) {
    var todo = {};
    response.writeHead(200, { "Content-Type": "text/plain" });
    todo['id'] = qs.parse(postData).id;
    todo['name'] = qs.parse(postData).name;
    todoList.push(todo);
    // console.log((todo));
    // console.log((todoList));
    // console.log(JSON.stringify(todo));
    // console.log(JSON.stringify(todoList));
    //response.write(JSON.stringify(todoList));
    response.write(JSON.stringify(todo['id']));
    //response.write("your post is id=" + qs.parse(postData).id + " name = " + qs.parse(postData).name);
    response.end();
  }

  if ("GET" === request.method.toUpperCase()) {
    var todo = {};
    response.writeHead(200, { "Content-Type": "text/plain" });
    //以是否傳入id判斷為是取List or 單筆
    if (url.parse(request.url, true).query.id != null || url.parse(request.url, true).query.id != undefined) {
      var id = url.parse(request.url, true).query.id;
      console.log(url.parse(request.url, true).query.id);
      for (var obj in todoList) {
        if (id == todoList[obj].id) {
          todo = todoList[obj];
        }
      }
      response.write(JSON.stringify(todo));
      response.end();
    } else {
      response.write(JSON.stringify(todoList));
      response.end();
    }
  }


  // not vaildata this method 2017/3/17
  if ("DELETE" === request.method.toUpperCase()) {
    var todo = {};
    response.writeHead(200, { "Content-Type": "text/plain" });
    var id = url.parse(request.url, true).query.id;
    for (var obj in todoList) {
      if (id == todoList[obj].id) {
        delete todoList[obj];
      }
    }
    response.write(JSON.stringify(todoList));
    response.end();
  }

  if ("PUT" === request.method.toUpperCase()) {

  }


}

exports.start = start;
exports.upload = upload;
exports.todo = todo;