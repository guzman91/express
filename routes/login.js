const { Router } = require("express");
const router = Router();

router.get("/auth/login", (req, res) => {
  res.render("auth/login", {
    title: "Sign Up",
    isLogin: true,
  });
});

router.post("/auth/login", (req, res) => {
  req.session.isAuthenticate = true;
  res.redirect("/courses");
});

router.get("/auth/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/auth/login");
});

module.exports = router;
