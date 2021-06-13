const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const Add = require("../models/add");

router.post("/add", async (req, res) => {
  const course = await Course.getCourseById(req.body.id);
  await Add.save(course);

  res.redirect("/add");
});

router.get("/add", async (req, res) => {
  const cart = await Add.fetch();

  res.render("add", {
    title: "Cart",
    isAdd: true,
    cart,
  });
});

router.delete("/courses/remove/:id", async (req, res) => {
  // console.log(req.params.id);
  // const cart = await Add.fetch();

  let result = await Add.delete(req.params.id);
  res.status(200).json(result);
});

module.exports = router;
