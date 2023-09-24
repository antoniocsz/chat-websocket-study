import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const PORT = 3001;

io.on("connection", (socket) => {
  console.log("Usuario conectado!", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Usuario desconectado!", socket.id);
  });

  socket.on("set_username", (username) => {
    socket.data.username = username;
    console.log(socket.data.username);
  });

  socket.on("message", (text) => {
    io.emit("receive_message", {
      text,
      authorId: socket.id,
      author: socket.data.username,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
