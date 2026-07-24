export default {
  layout: "layouts/post.njk",
  currentPage: "blog",
  tags: ["blog"],
  eleventyComputed: {
    permalink: (data) =>
      data.draft ? false : `/blog/${data.page.fileSlug}/index.html`,
    eleventyExcludeFromCollections: (data) => data.draft === true,
  },
};
