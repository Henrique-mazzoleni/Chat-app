require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index");
});

let count = 0;

io.on("connection", (socket) => {
  console.log("New websocket connection");

  const welcomeMessage = "welcome to the Chat app.";
  socket.emit("message", welcomeMessage);

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
