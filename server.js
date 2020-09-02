var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
const https = require("https");

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("server running");

/* 
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
 */

io.sockets.on("connection", function (socket) {
  connections.push(socket);
  console.log("connected: %s sockets connected", connections.length);

  io.socket.emit("roomInfo", {
    roomSize: connections.length,
  });

  io.socket.on("disconnect", function (data) {
    //disconnect
    connections.splice(connections.indexOf(socket), 1);
    io.socket.emit("roomInfo", {
      roomSize: connections.length,
    });
    console.log("disconnected: %s sockets connected", connections.length);
  });
});
