import markdownIt from "markdown-it";

function preserveLatexNegativeSpace(md) {
  md.inline.ruler.before("escape", "latex-negative-space", (state, silent) => {
    if (state.src.slice(state.pos, state.pos + 2) !== "\\!") {
      return false;
    }

    if (!silent) {
      state.pending += "\\!";
    }

    state.pos += 2;
    return true;
  });
}

export default function (eleventyConfig) {
  const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  });

  eleventyConfig.addFilter("relativeRoot", (url) => {
    if (typeof url !== "string") {
      return "./";
    }

    const segments = url.split("/").filter(Boolean);
    return segments.length === 0 ? "./" : "../".repeat(segments.length);
  });

  eleventyConfig.addFilter("readableDate", (date) =>
    dateFormatter.format(new Date(date)).replaceAll("/", "."),
  );

  eleventyConfig.addFilter("htmlDateString", (date) =>
    new Date(date).toISOString().slice(0, 10),
  );

  const markdownLibrary = markdownIt({
    html: true,
    linkify: true,
    typographer: false,
  }).use(preserveLatexNegativeSpace);

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addCollection("blogPosts", (collectionApi) =>
    collectionApi
      .getFilteredByTag("blog")
      .filter((post) => post.data.draft !== true)
      .sort((a, b) => b.date - a.date),
  );

  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  eleventyConfig.addWatchTarget("scss");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
}
