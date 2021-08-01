const { Router } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const router = Router();

router.get("/auth/login", (req, res) => {
  res.render("auth/login", {
    title: "Sign Up",
    isLogin: true,
    errorLogin: req.flash("loginError"),
    errorRegister: req.flash("registerErrors"),
  });
});

router.post("/auth/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      const areSame = await bcryptjs.compare(password, candidate.password);

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticate = true;
        req.session.save((err) => {
          if (err) console.log(err);
          else {
            res.redirect("/courses");
          }
        });
      } else {
        req.flash(
          "loginError",
          "Could not log in to the system. Please check whether email and password were entered correctly."
        );
        res.redirect("/auth/login#login");
      }
    } else {
      req.flash(
        "loginError",
        "Could not log in to the system. Please check whether email and password were entered correctly."
      );
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }

  // const userLogin = await User.findById("60d98e3d370e8626a09c00e7");
  // req.session.user = userLogin;
  // req.session.isAuthenticate = true;
  // req.session.save((err) => {
  //   if (err) console.log(err);
  //   else res.redirect("/courses");
  // });
});

router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      req.flash("registerErrors", "This email address is already being used");
      res.redirect("/auth/login#register");
    } else {
      const hashPassword = await bcryptjs.hash(password, 10);

      const user = new User({
        email,
        password: hashPassword,
        name,
        cart: { items: [] },
      });
      await user.save();
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/auth/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/auth/login");
});

module.exports = router;
