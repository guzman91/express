const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/courses", async (req, res) => {
  let courses = await Course.getAll();
  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses,
  });
});

router.get("/courses/:id", async (req, res) => {
  let course = await Course.getCourseById(req.params.id);

  res.render("course", {
    layout: "empty",
    title: `Course ${course.course}`,
    isCourses: true,
    course,
  });
});

router.post("/courses/edit", async (req, res) => {
  const course = await Course.editCourse(req.body);
  console.log(course);

  res.redirect("/courses");
});

router.get("/courses/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/courses");
  }
  let course = await Course.getCourseById(req.params.id);

  res.render("edit-course", {
    title: `Edit ${course.course}`,
    isCourses: true,
    course,
  });
});

module.exports = router;
