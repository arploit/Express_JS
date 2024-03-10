const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "." });
});

io.on("connection", (socket) => {
  console.log("user Connected");

  socket.on("sendMessage", (msg) => {
    socket.emit("emitEvent", { newMessage: msg });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

// let chatAppDiv = document.getElementById("chat_app");
// console.log("chatAppDiv", chatAppDiv);
