var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("server running");

users = [];
connections = [];

io.on("connection", function (socket) {
  console.log("New Client Connection");
  socket.emit("message", "welcome");
  socket.broadcast.emit("message", "new user connected");

  socket.on("disconnect", function () {
    console.log("user disconnected");
    io.emit("message", "user disconnected");
  });
});
