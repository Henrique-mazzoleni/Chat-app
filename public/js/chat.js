const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target.elements.message;
  const message = input.value;
  socket.emit("sendMessage", message);
  input.value = "";
});
