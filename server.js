const path = require("path");
const https = require("https");
const express = require("express");
const socketio = require("socket.io");

const app = express();

const server = https.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, function () {
  console.log("server running");
});

users = [];
connections = [];

io.on("connection", function (socket) {
  console.log("New Client Connection");
});
