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
    for (let val of users) {
      newUsers = [];
      console.log(val.socket + " " + val.user);
      2;

      if (io.sockets.connected[val.socket]) {
        console.log("socket " + val.socket + " verified");
        newUsers.push(val);
      } else {
        console.log("socket " + val.socket + " disconnected");
      }
    }
    users = newUsers;
    io.emit("usersUpdated", users);
  });
});

var UserUpdateLoop = setInterval(function () {
  for (let val of users) {
    io.emit("usersUpdated", users);
  }
}, 10000);
