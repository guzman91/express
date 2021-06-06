const id = require("uniqid");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { rejects } = require("assert");
const readFile = util.promisify(fs.readFile);

class Course {
  constructor(course, prise, url) {
    (this.course = course),
      (this.prise = prise),
      (this.url = url),
      (this.id = id());
  }

  writeJSON(json) {
    fs.writeFile(
      path.join(__dirname, "..", "data", "courses.json"),
      JSON.stringify(json),
      (err) => {
        if (err) throw err;
      }
    );
  }

  toJSON() {
    return {
      course: this.course,
      prise: this.prise,
      url: this.url,
      id: this.id,
    };
  }

  async save() {
    const courses = await Course.getAll();

    await courses.push(this.toJSON());

    this.writeJSON(courses);
  }

  static async getAll() {
    const file = await readFile(
      path.join(__dirname, "..", "data", "courses.json"),
      "utf-8"
    );

    return JSON.parse(file);
  }

  static async getCourseById(id) {
    let c = await Course.getAll();
    return c.find((i) => i.id === id);
  }
}

module.exports = Course;
