const express = require("express");

const app = express();
const port = 3000;
const { rssFeeder } = require("./rssFeeder");
const { getData } = require("./getData");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  const feedItems = await getData();
  res.render("index", { data: feedItems });
});

app.post("/", async (req, res) => {
  const feed = await rssFeeder();
  const feedItems = await getData();
  res.render("index", { data: feedItems });
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
