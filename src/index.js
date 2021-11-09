require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const express = require("express");

const port = process.env.PORT;
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", async (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
