const util = require("util");
const path = require("path");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const filePath = path.join(require.main.path, "data", "card.json");

class Add {
  static async save(course) {
    let card = await Add.fetch();
    let idx = await card.courses.findIndex((item) => item.id == course.id);
    let isExist = card.courses[idx];

    if (isExist) {
      card.courses[idx].count++;
    } else {
      course.count = 1;
      card.courses.push(course);
    }
    card.price += +course.prise;
    await writeFile(filePath, JSON.stringify(card));
  }

  static async fetch() {
    let card = await readFile(filePath, "utf-8");
    return JSON.parse(card);
  }

  static async delete(id) {
    const cart = await Add.fetch();
    let idx = await cart.courses.findIndex((item) => item.id == id);
    let coursePrice = await cart.courses[idx].prise;
    if (cart.courses[idx].count == 1) {
      cart.courses = await cart.courses.filter((item) => {
        return item.id !== id;
      });
    } else {
      cart.courses[idx].count--;
    }
    cart.price -= coursePrice;
    await writeFile(filePath, JSON.stringify(cart));
    return JSON.stringify(cart);
  }
}

module.exports = Add;
