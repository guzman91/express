const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const isAuth = require("../middleware/auth");

router.get("/about", isAuth, (req, res) => {
  res.render("about", {
    title: "Add Course",
    isAbout: true,
  });
});

router.post("/about", async (req, res) => {
  const course = new Course({
    title: req.body.course,
    price: req.body.price,
    url: req.body.file_URL,
    userID: req.user,
  });

  try {
    await course.save();
    res.redirect("/courses");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
