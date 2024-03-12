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
const io = new Server(server);

// const { WebSocketServer } = require("ws");
const port = 3000;
// const sockserver = new WebSocketServer({ port: 433 });

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send-message", (req, res) => {
  console.log("req", req.body);
  res.json({ connectionString: "Connected a successfully" });
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// sockserver.on("connection", (ws) => {
//   console.log("someone connected", ws);
// });

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("sendMessage", (msg) => {
    io.emit("emitEvent", { newMessage: msg });
  });
});

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
