require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

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
hbs.registerHelper("raw", (value) => value.fn());

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/chat", (req, res) => {
  res.render("chat");
});

let count = 0;

io.on("connection", (socket) => {
  console.log("New websocket connection");

  socket.on("join", ({ username, room }) => {
    socket.join(room);

    socket.emit("message", generateMessage("Welcome!"));
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined ${room}!`));
  });

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) return callback("Profanity is not allowed");
    io.emit("message", generateMessage(message));
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    io.emit("locationMessage", generateLocationMessage(coords));
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has left."));
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
