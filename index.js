const express = require("express");
//const path = require("path");
const exphbs = require("express-handlebars");
const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about");
const coursesRouter = require("./routes/courses");
const { urlencoded } = require("express");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use(homeRouter);
app.use(aboutRouter);
app.use(coursesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
