const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  //   res.send("Hello world");
  //   res.setHeader("Content-Type", "application/json");
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("Listening to the port", port);
});
