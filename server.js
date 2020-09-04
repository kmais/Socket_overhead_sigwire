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
  socket.emit("message", "welcome");
  socket.broadcast.emit("message", "new user connected");
  io.emit("socketInfo", socket.id);

  socket.on("disconnect", function (data) {
    console.log("user disconnected");
    console.log(data);
    io.emit("message", "user disconnected");
  });

  socket.on("newAgent", function () {
    console.log("user disconnected");
    io.emit("message", "user disconnected");
  });

  socket.on("clickedIT", function (data) {
    console.log("clickedIT");
    console.log(data);
    socket.broadcast.emit("notify", data);
  });
  /* */
  socket.on("userUpdate", function (data) {
    console.log("User Update");

    console.log(data);
    users.push(data);
    io.emit("usersUpdated", users);
  });
});
