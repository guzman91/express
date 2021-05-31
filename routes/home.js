const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("mainPage", {
    title: "Main page",
    isHome: true,
  });
});

module.exports = router;
