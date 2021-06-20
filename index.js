const express = require("express");
const exphbs = require("express-handlebars");
const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about");
const coursesRouter = require("./routes/courses");
const addRouter = require("./routes/add");
const mongoose = require("mongoose");
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

const user = "jora";
const password = "CfD1nftmCEqtX4JD";

const url = `mongodb+srv://${user}:${password}@cluster0.n0udu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jora:<password>@cluster0.n0udu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

app.use(homeRouter);
app.use(aboutRouter);
app.use(coursesRouter);
app.use(addRouter);
