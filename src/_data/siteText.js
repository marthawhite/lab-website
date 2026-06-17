const fs = require("fs");
const path = require("path");

function readMarkdownFile(fileName) {
  const filePath = path.join(__dirname, "..", "content", fileName);
  return fs.readFileSync(filePath, "utf8").trim();
}

function readFile(...segments) {
  return fs.readFileSync(path.join(__dirname, "..", ...segments), "utf8").trim();
}

module.exports = {
  homeBio: readMarkdownFile("home-bio.md"),
  aboutMe: readMarkdownFile("about-me.md"),
  researchFocus: readMarkdownFile("research-focus.md"),
  researchIntro: readFile("research", "_intro.md"),
  prospectiveStudents: readMarkdownFile("prospective-students.md")
};
