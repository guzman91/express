const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    isAbout: true,
  });
});

router.post("/about", (req, res) => {
  const course = new Course(req.body.Course, req.body.Price, req.body.File_URL);

  course.save();

  res.redirect("/about");
});

module.exports = router;
