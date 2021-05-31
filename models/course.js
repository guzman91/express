const id = require("uniqid");
const path = require("path");
const fs = require("fs");
const { rejects } = require("assert");

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

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "courses.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }
}

module.exports = Course;
