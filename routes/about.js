const { Router } = require("express");
const router = Router();

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    isAbout: true,
  });
});

router.post("/about", (req, res) => {
  console.log(req.body);

  res.redirect("/about");
});

module.exports = router;
