const { Schema, model } = require("mongoose");

const order = new Schema({
  courses: [
    {
      title: {
        type: Object,
        require: true,
      },
      count: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
    },
  ],
  user: {
    name: String,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Order", order);
