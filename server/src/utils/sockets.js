function listen(io) {
  io.on("connection", (socket) => {
    socket.on("join_room", (roomName) => {
      socket.join(roomName);
    });

    socket.on("send-msg", (data) => {
      socket.to(data.room).emit("rec-msg", data);
    });
  });
}

module.exports = { listen };
