const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const { rssFeeder } = require("./rssFeeder");
const { getData } = require("./getData");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  const feedItems = await getData();
  res.render("index", { data: feedItems });
});

app.post("/", async (req, res) => {
  rssFeeder();
  setTimeout(() => {
    res.redirect("/");
  }, 1500);
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
