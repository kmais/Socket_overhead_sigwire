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
  console.log(socket.id);
  io.emit("message", "welcome");
  io.emit("message", "new user connected");
  io.emit("socketInfo", socket.id);

  socket.on("disconnect", function () {
    console.log("user disconnected");
    io.emit("message", "user disconnected");
  });

  io.on("clickedIT", function (data) {
    console.log("clickedIT");
    console.log(data);
    io.emit("notify", data);
  });
});
