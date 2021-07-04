const { Router } = require("express");
const order = require("../models/order");
const router = Router();
const Order = require("../models/order");

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({
      "user.userID": req.user._id,
    })
      .populate("user.userID")
      .lean();

    //console.log("orders", orders);

    const userOrders = orders.map((i) => {
      return {
        userName: i.user.name,
        _id: i._id,
        courses: i.courses,
        date: i.date,
        //orders,
        price: i.courses.reduce((sum, current) => {
          return (sum += current.price * current.count);
        }, 0),
      };
    });

    res.render("order", {
      title: "Orders",
      isOrder: true,
      userOrders,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/orders", async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.course", "title price").execPopulate();

    const userOrder = user.cart.items.map((item) => ({
      count: item.count,
      title: item.course.title,
      price: item.course.price,
      userID: item.course._id,
    }));

    //console.log("req.user", req.user);

    const order = new Order({
      user: {
        name: req.user.name,
        userID: req.user,
      },

      courses: userOrder,
    });
    console.log("user", user);

    order.save();
    req.user.clearCart();

    //console.log("userOrder", userOrder);

    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
