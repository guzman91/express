const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
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
  // console.log("course", course);
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
  console.log("this", this);
};

module.exports = model("User", userSchema);
