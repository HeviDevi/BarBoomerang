const { MongoClient } = require("mongodb");
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 3001;
const URI = process.env.DB_URI;
client = new MongoClient(URI);
const mongooseConnection = require("./config/connection");
const dbName = process.env.DB_NAME;
routes = require("./routes");

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(routes);

// app.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   })
// })
