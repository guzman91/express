const { body } = require("express-validator");

exports.validator = [
  body("email").isEmail().withMessage("Please Enter Email"),
  body("password").isStrongPassword().withMessage("Password does not meet complexity requirements"),
  body("name").isLength({ min: 3 }).withMessage("Name should contain more than 2 characters"),
  body("passConfirm").custom((value, { req }) => {
    if (value == req.body.password) {
      return true;
    } else {
      throw new Error("Password and confirm password do not match");
    }
  }),
];
