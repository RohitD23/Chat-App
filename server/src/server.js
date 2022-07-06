const { createServer } = require("http");
const io = require("socket.io");
require("dotenv").config();

const connectMongo = require("./utils/connection");
const app = require("./app");
const sockets = require("./utils/sockets");

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

const httpServer = createServer(app);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

async function startServer() {
  await connectMongo(MONGO_URL);
  httpServer.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
  });

  sockets.listen(socketServer);
}

startServer();
