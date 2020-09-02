const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, function () {
  console.log("server running");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

/*  */

io.on("connection", function (socket) {
  console.log("New Client Connection");
});
