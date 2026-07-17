export default function (eleventyConfig) {
  eleventyConfig.addFilter("relativeRoot", (url) => {
    const segments = url.split("/").filter(Boolean);
    return segments.length === 0 ? "./" : "../".repeat(segments.length);
  });

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
