const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.static('public'));
require("dotenv").config()
let PORT = process.env.PORT || 8080
const cors = require('cors')
const quickmongo = require('quickmongo');
const db = new quickmongo.Database(process.env.DBURL);

db.on("ready", async () => {
  console.log("[QuickMongo] Connected to the Database.");
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/articles", async (req, res) => {
  let articles = await db.get('articles');
  res.send(articles)
})

app.listen(PORT, console.log("[Express] Listening to port " + PORT))