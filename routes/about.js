const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/about", (req, res) => {
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
    res.redirect("/about");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
