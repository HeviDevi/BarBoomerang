const { MongoClient } = require("mongodb");
express = require("express");
require("dotenv").config();
app = express();
PORT = 3001;
URI = process.env.DB_URI;
client = new MongoClient(URI);
let db = require("./config/connection");
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

app.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
})
