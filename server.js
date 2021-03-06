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

    for (i = 0; i < users.length; i++) {
      console.log(users[i]);

      if (!io.sockets.connected[users[i].socket]) {
        console.log("disconnected");
        users.slice(i, 1);
      }
      if (io.sockets.connected[users[i].socket]) {
        console.log(users[i].socket + " - connected");
      }
    }

    /*
     for (let val of users) {
      if (!io.sockets.connected[val.socket]) {
        users.splice(x, 1);
      }
    } 
    */

    io.emit("usersUpdated", users);
  });
});

var UserUpdateLoop = setInterval(function () {
  for (i = 0; i < users.length; i++) {
    console.log(users[i]);

    var thisGuy = io.sockets.connected[users[i].socket];

    if (!thisGuy) {
      console.log(users[i].socket + " - disconnected");
    }
    if (io.sockets.connected[users[i].socket]) {
      console.log(users[i].socket + " - connected");
    }
  }
  io.emit("usersUpdated", users);
}, 10000);
