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

router.get("/courses/:id", async (req, res) => {
  let course = await Course.getCourseById(req.params.id);

  res.render("course", {
    title: `Course ${course.course}`,
    isCourses: true,
    course,
  });
});

module.exports = router;
