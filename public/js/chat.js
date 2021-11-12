const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target.elements.message;
  const message = input.value;
  socket.emit("sendMessage", message, (error) => {
    if (error) return console.log(error);
    console.log("message delivered");
  });
  input.value = "";
});

document.querySelector("#send-location").addEventListener("click", (e) => {
  if (!navigator.geolocation) return alert("not suported by browser");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location shared!");
      }
    );
  });
});
