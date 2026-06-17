const fs = require("fs");
const path = require("path");

const researchDir = path.join(__dirname, "..", "research");

function parseScalar(value = "") {
  const trimmed = value.trim();

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);

  return trimmed.replace(/^['"]|['"]$/g, "");
}

function parseFrontMatterBlock(block = "") {
  const data = {};
  const lines = block.split(/\r?\n/);
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];

    if (!rawLine.trim()) {
      index += 1;
      continue;
    }

    const fieldMatch = rawLine.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!fieldMatch) {
      index += 1;
      continue;
    }

    const key = fieldMatch[1];
    const value = fieldMatch[2];

    if (value === "") {
      // Possibly a list of bare scalar items on following indented "- " lines.
      const items = [];
      let cursor = index + 1;

      while (cursor < lines.length && /^\s*-\s+/.test(lines[cursor])) {
        items.push(parseScalar(lines[cursor].replace(/^\s*-\s+/, "")));
        cursor += 1;
      }

      data[key] = items;
      index = items.length ? cursor : index + 1;
      continue;
    }

    data[key] = parseScalar(value);
    index += 1;
  }

  return data;
}

function parseTopicFile(contents = "") {
  const match = contents.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    return { frontMatter: {}, body: contents.trim() };
  }

  return {
    frontMatter: parseFrontMatterBlock(match[1]),
    body: match[2].trim()
  };
}

function normalizeTopic(topic = {}, body = "", fileName = "") {
  const id = path.basename(fileName, ".md");

  return {
    id,
    title: topic.title || "",
    order: Number(topic.order) || 999,
    publications: Array.isArray(topic.publications) ? topic.publications : [],
    image: topic.image || "/assets/images/research/example.svg",
    body
  };
}

module.exports = function () {
  if (!fs.existsSync(researchDir)) {
    return [];
  }

  return fs
    .readdirSync(researchDir)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .sort()
    .map((fileName) => {
      const filePath = path.join(researchDir, fileName);
      const parsed = parseTopicFile(fs.readFileSync(filePath, "utf8"));
      return normalizeTopic(parsed.frontMatter, parsed.body, fileName);
    })
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });
};
