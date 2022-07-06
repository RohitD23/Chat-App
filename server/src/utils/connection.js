const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("Mongo connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function connectMongo(MONGO_URL) {
  await mongoose.connect(MONGO_URL);
}
module.exports = connectMongo;
