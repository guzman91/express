const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/courses", async (req, res) => {
  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses: await Course.getAll(),
  });
});

module.exports = router;
