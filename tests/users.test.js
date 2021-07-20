const User = require("../models/user");

test("Check sum of 2 values", () => {
  expect(User.sumTwoValues(2, 3)).toBe(5);
});
