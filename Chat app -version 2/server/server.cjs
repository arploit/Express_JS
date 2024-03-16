// const express = require("express");
// let app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.listen(port, () => {
//   console.log("Someone Connected");
// });

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  // Now, the CORS config.
  // You could either use the new `cors` property...
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: "*",
  },
});

// const { WebSocketServer } = require("ws");
const port = 3000;
// const sockserver = new WebSocketServer({ port: 433 });

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// sockserver.on("connection", (ws) => {
//   console.log("someone connected", ws);
// });

const setUsers = (sockets) => {
  sockets.forEach((socket) => {
    console.log(socket.id);
  });
};

let connectedUser = [3001, 3002];
const setClientUserInfo = (data) => {
  let { userId } = data;
  console.log(userId);
};

const sendingMessage = (id, message, socket) => {
  console.log("id", id, message);
  socket.to("room1").emit("newMessage", { newMessage: message, from: id });
};

const sendMessage = (data, socket) => {
  let { userId, message } = data;
  if (userId === connectedUser[0]) {
    sendingMessage(connectedUser[1], message, socket);
  } else sendingMessage(connectedUser[0], message, socket);

  return;
};

io.on("connection", (socket) => {
  // console.log("socket.handshake.headers", socket.handshake.headers);
  socket.on("storeClientInfo", (data) => {
    setClientUserInfo(data);
    socket.join("room1");
    socket.emit("roomJoined", { roomId: "room1" });
  });

  socket?.on("sendMessage", (msg) => {
    console.log("connected", socket.connected, socket);
    sendMessage(msg, socket);
  });
});

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
