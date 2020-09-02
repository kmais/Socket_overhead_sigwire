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
  console.log(socket);
  io.emit("message", "welcome");
  io.emit("message", "new user connected");
  io.emit("socketInfo", socket);

  socket.on("disconnect", function () {
    console.log("user disconnected");
    io.emit("message", "user disconnected");
  });
});
