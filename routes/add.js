const { Router } = require("express");
//const course = require("../models/course");
const router = Router();
const Course = require("../models/course");

function mapUserCart(array) {
  return array.map((item) => ({
    count: item.count,
    title: item.course.title,
    price: item.course.price,
    id: item.course._id,
  }));
}

function calculateCartPrice(array) {
  return array.reduce((sum, current) => {
    return (sum += current.price * current.count);
  }, 0);
}

router.post("/add", async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);

  res.redirect("/add");
});

router.get("/add", async (req, res) => {
  const user = await req.user.populate("cart.items.course", "title price").execPopulate();

  const userCart = mapUserCart(user.cart.items);

  const cartAmount = calculateCartPrice(userCart);
  res.render("add", {
    title: "Cart",
    isAdd: true,
    userCart,
    cartAmount,
  });
});

router.delete("/courses/remove/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  await req.user.removeFromCart(course);
  const user = await req.user.populate("cart.items.course", "title price").execPopulate();

  const userCart = mapUserCart(user.cart.items);

  const cartAmount = calculateCartPrice(userCart);
  const result = {
    userCart,
    cartAmount,
  };

  //console.log("result", result);
  // let result = await Add.delete(req.params.id);
  res.status(200).json(result);
});

module.exports = router;
