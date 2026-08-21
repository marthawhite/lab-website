const fs = require("fs");
const path = require("path");

const membersDir = path.join(__dirname, "..", "members");

const roleOrder = {
  "Postdoc": 1,
  "Postdoctoral Researcher": 1,
  "Postdoctoral Fellow": 1,
  "PhD Student": 2,
  "Research Assistant": 3,
  "MSc Student": 4,
  "Undergraduate Student": 5
};

function getLastName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
}

function normalizeMember(member = {}, fileName = "") {
  return {
    id: path.basename(fileName, ".json"),
    name: member.name || "",
    role: member.role || "",
    coSupervisor: member.coSupervisor || "",
    program: member.program || "",
    researchAreas: Array.isArray(member.researchAreas) ? member.researchAreas : [],
    website: member.website || "",
    googleScholar: member.googleScholar || "",
    photo: member.photo || "/assets/images/placeholders/member-placeholder.svg",
    joiningDate: member.joiningDate || "",
    lastName: getLastName(member.name || ""),
    order: roleOrder[member.role] || 999
  };
}

function compareMembers(a, b) {
  if (a.order !== b.order) {
    return a.order - b.order;
  }

  const lastNameCompare = a.lastName.localeCompare(b.lastName);
  if (lastNameCompare !== 0) {
    return lastNameCompare;
  }

  return a.name.localeCompare(b.name);
}

module.exports = function () {
  if (!fs.existsSync(membersDir)) {
    return [];
  }

  return fs
    .readdirSync(membersDir)
    .filter((fileName) => fileName.endsWith(".json") && !fileName.startsWith("_"))
    .sort()
    .map((fileName) => {
      const filePath = path.join(membersDir, fileName);
      const contents = JSON.parse(fs.readFileSync(filePath, "utf8"));

      return normalizeMember(contents, fileName);
    })
    .sort(compareMembers);
};
