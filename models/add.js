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
      course.count = 0;
      card.courses.push(course);
    }
    card.price += +course.prise;
    await writeFile(filePath, JSON.stringify(card));
  }

  static async fetch() {
    let card = await readFile(filePath, "utf-8");
    return JSON.parse(card);
  }
}

module.exports = Add;
