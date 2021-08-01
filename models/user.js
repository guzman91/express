const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "John",
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        course: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = async function (course) {
  const items = this.cart.items.concat([]);
  const idx = await items.findIndex((c) => {
    return c.course.toString() == course._id.toString();
  });
  if (idx >= 0) {
    items[idx].count++;
  } else {
    items.push({
      count: 1,
      course: course._id,
    });
  }

  this.cart = { items };
  return this.save();
  // console.log("this.cart", this.cart);
};

userSchema.methods.removeFromCart = async function (course) {
  let items = this.cart.items.concat([]);
  const idx = await items.findIndex((c) => {
    return c.course.toString() == course._id.toString();
  });
  if (items[idx].count == 1) {
    items = items.filter((i) => i.course.toString() !== course._id.toString());
  } else {
    items[idx].count--;
  }
  this.cart = { items };
  // console.log("this.cart", this.cart);
  return this.save();
};

userSchema.methods.clearCart = async function () {
  this.cart = { items: [] };
  return this.save();

  //console.log("this.cart.items", this.cart.items);
};

userSchema.statics.sumTwoValues = function (a, b) {
  return a + b;
};

module.exports = model("User", userSchema);
