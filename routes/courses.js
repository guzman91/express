const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/courses", async (req, res) => {
  let courses = await Course.find().lean();
  res.render("courses", {
    title: "Courses",
    isCourses: true,
    id: req.user ? req.user._id : null,
    courses,
  });
});

router.get("/courses/:id", async (req, res) => {
  let course = await Course.findById(req.params.id).lean();

  res.render("course", {
    layout: "empty",
    title: `Course ${course.title}`,
    isCourses: true,
    course,
  });
});

router.post("/courses/edit", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  //console.log("req.user", req.user);
  const course = await Course.findByIdAndUpdate(id, req.body);
  // console.log(course);

  res.redirect("/courses");
});

router.get("/courses/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/courses");
  }
  let course = await Course.findById(req.params.id).lean();

  res.render("edit-course", {
    title: `Edit ${course.title}`,
    isCourses: true,
    course,
  });
});

router.post("/courses/remove", async (req, res) => {
  await Course.deleteOne({ _id: req.body.id });

  res.redirect("/courses");
});

module.exports = router;
