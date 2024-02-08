const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const articleJSON = require("./articles/articles.json")
app.use(express.static('public'));
require("dotenv").config()
let PORT = process.env.PORT
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/articles", async (req, res) => {
  res.send(articleJSON)
})

let accounts = [
  {
    "username": "meesam4687",
    "password": process.env.PASS_MEESAM
  }
]

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let authObj = {
    "username": username,
    "password": password
  }
  const isAuthenticated = accounts.some(obj => obj.username === authObj.username && obj.password === authObj.password)
  res.json({ isAuthenticated });
});

app.use('/articles/assets', express.static('articles/assets'));

app.listen(PORT, console.log("Listening to port " + PORT))