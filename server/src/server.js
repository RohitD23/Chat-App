const { createServer } = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

const server = createServer(app);

mongoose.connection.once("open", () => {
  console.log("Mongo connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
  });
}

startServer();
