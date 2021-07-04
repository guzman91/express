const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/auth/login", (req, res) => {
  res.render("auth/login", {
    title: "Sign Up",
    isLogin: true,
  });
});

router.post("/auth/login", async (req, res) => {
  const userLogin = await User.findById("60d98e3d370e8626a09c00e7");
  req.session.user = userLogin;
  req.session.isAuthenticate = true;
  req.session.save((err) => {
    if (err) console.log(err);
    else res.redirect("/courses");
  });
});

router.get("/auth/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/auth/login");
});

module.exports = router;
