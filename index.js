const express = require("express");
const exphbs = require("express-handlebars");
const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about");
const coursesRouter = require("./routes/courses");
const addRouter = require("./routes/add");
const orderRouter = require("./routes/order");
const mongoose = require("mongoose");
const User = require("./models/user");
const { urlencoded } = require("express");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
  try {
    const userLogin = await User.findById("60d98e3d370e8626a09c00e7");
    req.user = userLogin;
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const userName = "jora";
const password = "CfD1nftmCEqtX4JD";

const url = `mongodb+srv://${userName}:${password}@cluster0.n0udu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const candidate = await User.findOne();

    if (!candidate) {
      const user = new User({
        email: "jora@gmail.com",
        name: "Maksim",
        cart: { items: [] },
      });

      user.save();
    }

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
app.use(orderRouter);
