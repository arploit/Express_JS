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
const port = 3000;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
