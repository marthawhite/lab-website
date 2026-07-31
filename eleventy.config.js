const markdownIt = require("markdown-it");

const baseUrl = (process.env.BASE_URL || "").replace(/\/+$/, "");

const md = markdownIt({
  html: false,
  breaks: true,
  linkify: true
});

function normalizeUrl(url = "/") {
  if (url === "/") {
    return "/";
  }

  return url.endsWith("/") ? url : `${url}/`;
}

function withBaseUrl(url = "/") {
  if (!url) {
    return baseUrl || "/";
  }

  if (/^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("#")) {
    return url;
  }

  if (!url.startsWith("/")) {
    return url;
  }

  if (!baseUrl) {
    return url;
  }

  if (url === "/") {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${url}`;
}

function sortPublications(items = []) {
  return [...items].sort((a, b) => {
    if ((a.year || 0) !== (b.year || 0)) {
      return (b.year || 0) - (a.year || 0);
    }

    if ((a.order || 0) !== (b.order || 0)) {
      return (b.order || 0) - (a.order || 0);
    }

    return (a.title || "").localeCompare(b.title || "");
  });
}

function publicationSectionTitle(publication = {}) {
  const explicitSection = (publication.section || "").toLowerCase();
  const type = (publication.type || "").toLowerCase();

  if (explicitSection.includes("thes")) {
    return "Theses";
  }

  if (explicitSection.includes("preprint") || explicitSection.includes("working")) {
    return "Preprints and Working papers";
  }

  if (explicitSection.includes("publication")) {
    return "Publications";
  }

  if (type.includes("thes")) {
    return "Theses";
  }

  if (type.includes("preprint") || type.includes("working") || type.includes("report")) {
    return "Preprints and Working papers";
  }

  return "Publications";
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/teachingdocs": "teachingdocs" });

  eleventyConfig.addFilter("withBaseUrl", (value) => withBaseUrl(value));
  eleventyConfig.addFilter("markdown", (value) => md.render(value || ""));

  eleventyConfig.addFilter("isActiveNav", (itemUrl, pageUrl) => {
    const normalizedItemUrl = normalizeUrl(itemUrl);
    const normalizedPageUrl = normalizeUrl(pageUrl);

    if (normalizedItemUrl === "/") {
      return normalizedPageUrl === "/";
    }

    return normalizedPageUrl.startsWith(normalizedItemUrl);
  });

  eleventyConfig.addFilter("sortNews", (items = []) => {
    return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  eleventyConfig.addFilter("groupPublicationsByYear", (items = []) => {
    const sortedItems = sortPublications(items);

    return sortedItems.reduce((groups, item) => {
      let group = groups.find((entry) => entry.year === item.year);

      if (!group) {
        group = { year: item.year, items: [] };
        groups.push(group);
      }

      group.items.push(item);
      return groups;
    }, []);
  });

  eleventyConfig.addFilter("groupPublicationsBySection", (items = []) => {
    const sections = [
      { title: "Preprints and Working papers", items: [] },
      { title: "Publications", items: [] },
      { title: "Theses", items: [] }
    ];

    for (const item of sortPublications(items)) {
      const section = sections.find((entry) => entry.title === publicationSectionTitle(item));
      section.items.push(item);
    }

    return sections;
  });

  eleventyConfig.addFilter("publicationLinks", (publication = {}) => {
    if (Array.isArray(publication.links) && publication.links.length) {
      return publication.links.filter((link) => link && link.label && link.url);
    }

    const legacyLinks = [
      { label: "PDF", url: publication.pdfUrl },
      { label: "Project page", url: publication.projectUrl },
      { label: "Video", url: publication.videoUrl },
      { label: "Demo", url: publication.demoUrl },
      { label: "Poster", url: publication.posterUrl }
    ];

    return legacyLinks.filter((link) => link.url);
  });

  eleventyConfig.addFilter("sortTeaching", (items = []) => {
    const termOrder = {
      Winter: 1,
      Spring: 2,
      Summer: 3,
      Fall: 4
    };

    return [...items].sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }

      return (termOrder[b.term] ?? -1) - (termOrder[a.term] ?? -1);
    });
  });

  eleventyConfig.addFilter("embedUrl", (url = "") => {
    if (!url) {
      return "";
    }

    const youtube = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
    );
    if (youtube) {
      return `https://www.youtube.com/embed/${youtube[1]}`;
    }

    const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    if (drive) {
      return `https://drive.google.com/file/d/${drive[1]}/preview`;
    }

    const facebook = url.match(/facebook\.com\/(?:[^/]+\/videos\/\d+|watch\/?\?v=\d+)/);
    if (facebook) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
    }

    return "";
  });

  eleventyConfig.addFilter("embedThumb", (url = "") => {
    if (!url) {
      return "";
    }

    const youtube = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
    );
    if (youtube) {
      return `https://img.youtube.com/vi/${youtube[1]}/hqdefault.jpg`;
    }

    const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    if (drive) {
      return `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w800`;
    }

    return "";
  });

  const ALUMNI_GROUPS = [
    { title: "Postdoctoral Researchers", match: /postdoc|research associate/i },
    { title: "PhD Students", match: /phd/i },
    { title: "MSc Students", match: /msc|master/i },
    { title: "Undergraduate Students", match: /under\s?grad|honou?rs|b\.?sc/i }
  ];

  eleventyConfig.addFilter("groupAlumni", (items = []) => {
    const buckets = ALUMNI_GROUPS.map((group) => ({ title: group.title, items: [] }));
    const other = { title: "Other", items: [] };

    (Array.isArray(items) ? items : []).forEach((alum) => {
      const role = alum && alum.role ? alum.role : "";
      const index = ALUMNI_GROUPS.findIndex((group) => group.match.test(role));

      if (index === -1) {
        other.items.push(alum);
      } else {
        buckets[index].items.push(alum);
      }
    });

    const result = buckets.filter((bucket) => bucket.items.length);
    if (other.items.length) {
      result.push(other);
    }
    return result;
  });

  eleventyConfig.addFilter("resolvePublications", (publications = [], refs = []) => {
    if (!Array.isArray(publications) || !Array.isArray(refs)) {
      return [];
    }

    return refs
      .map((ref) => publications.find((pub) => pub && (pub.slug === ref || pub.id === ref)))
      .filter(Boolean);
  });

  eleventyConfig.addFilter("memberWebsite", (members = [], name = "") => {
    if (!name) {
      return "";
    }

    const match = (Array.isArray(members) ? members : []).find(
      (member) => member && member.name === name
    );

    return match && match.website ? match.website : "";
  });

  eleventyConfig.addFilter("withTalkMedia", (items = []) => {
    return (Array.isArray(items) ? items : []).filter(
      (item) => item && (item.embed || item.slides)
    );
  });

  eleventyConfig.addFilter("sortTalks", (items = []) => {
    return [...items].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;

      if (dateA !== dateB) {
        return dateB - dateA;
      }

      return (a.title || "").localeCompare(b.title || "");
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
