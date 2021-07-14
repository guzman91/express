const express = require("express");
const exphbs = require("express-handlebars");
const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about");
const coursesRouter = require("./routes/courses");
const addRouter = require("./routes/add");
const orderRouter = require("./routes/order");
const loginRouter = require("./routes/login");
const authMiddleware = require("./middleware/variables");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const User = require("./models/user");
const { urlencoded } = require("express");
const user = require("./middleware/user");

const userName = "jora";
const password = "CfD1nftmCEqtX4JD";
const MongoURI = `mongodb+srv://${userName}:${password}@cluster0.n0udu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: MongoURI,
  collection: "mySessions",
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(authMiddleware);
app.use(user);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    //const candidate = await User.findOne();

    // if (!candidate) {
    //   const user = new User({
    //     email: "jora@gmail.com",
    //     name: "Maksim",
    //     cart: { items: [] },
    //   });

    //   user.save();
    // }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

app.use(homeRouter);
app.use(aboutRouter);
app.use(coursesRouter);
app.use(addRouter);
app.use(orderRouter);
app.use(loginRouter);
