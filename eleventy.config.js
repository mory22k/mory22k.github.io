import markdownIt from "markdown-it";

const categorySlugOverrides = new Map([
  ["お知らせ", "news"],
  ["技術メモ", "technical-notes"],
]);

export function categorySlug(category) {
  const categoryName = String(category ?? "").trim();

  if (categorySlugOverrides.has(categoryName)) {
    return categorySlugOverrides.get(categoryName);
  }

  return (
    categoryName
      .normalize("NFKC")
      .toLocaleLowerCase("ja-JP")
      .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
      .replace(/^-+|-+$/g, "") || "uncategorized"
  );
}

function getBlogPosts(collectionApi) {
  return collectionApi
    .getFilteredByTag("blog")
    .filter((post) => post.data.draft !== true)
    .sort((a, b) => b.date - a.date);
}

export function preserveLatexMath(md) {
  md.block.ruler.before(
    "fence",
    "latex-math-block",
    (state, startLine, endLine, silent) => {
      const start = state.bMarks[startLine] + state.tShift[startLine];
      const end = state.eMarks[startLine];

      if (state.src.slice(start, end).trim() !== "$$") {
        return false;
      }

      let closingLine = startLine + 1;

      while (closingLine < endLine) {
        const closingStart =
          state.bMarks[closingLine] + state.tShift[closingLine];
        const closingEnd = state.eMarks[closingLine];

        if (state.src.slice(closingStart, closingEnd).trim() === "$$") {
          break;
        }

        closingLine += 1;
      }

      if (closingLine >= endLine) {
        return false;
      }

      if (silent) {
        return true;
      }

      const token = state.push("latex_math_block", "", 0);
      token.block = true;
      token.map = [startLine, closingLine + 1];
      token.content = state.getLines(startLine, closingLine + 1, 0, false);

      state.line = closingLine + 1;
      return true;
    },
  );

  md.inline.ruler.before("escape", "latex-math", (state, silent) => {
    if (state.src[state.pos] !== "$") {
      return false;
    }

    const delimiter = state.src.startsWith("$$", state.pos) ? "$$" : "$";

    // Do not treat either half of an unmatched "$$" as an inline delimiter.
    if (
      delimiter === "$" &&
      (state.src[state.pos - 1] === "$" || state.src[state.pos + 1] === "$")
    ) {
      return false;
    }

    let searchPos = state.pos + delimiter.length;
    let endPos = -1;

    while (searchPos < state.src.length) {
      const candidatePos = state.src.indexOf(delimiter, searchPos);

      if (candidatePos === -1) {
        break;
      }

      let backslashCount = 0;
      for (
        let pos = candidatePos - 1;
        pos >= 0 && state.src[pos] === "\\";
        pos -= 1
      ) {
        backslashCount += 1;
      }

      const isEscaped = backslashCount % 2 === 1;
      const isPartOfDoubleDelimiter =
        delimiter === "$" &&
        (state.src[candidatePos - 1] === "$" ||
          state.src[candidatePos + 1] === "$");

      if (!isEscaped && !isPartOfDoubleDelimiter) {
        endPos = candidatePos;
        break;
      }

      searchPos = candidatePos + delimiter.length;
    }

    if (endPos === -1) {
      return false;
    }

    const nextPos = endPos + delimiter.length;

    if (!silent) {
      const token = state.push("latex_math", "", 0);
      token.content = state.src.slice(state.pos, nextPos);
    }

    state.pos = nextPos;
    return true;
  });

  md.renderer.rules.latex_math = (tokens, index) =>
    md.utils.escapeHtml(tokens[index].content);

  md.renderer.rules.latex_math_block = (tokens, index) =>
    `<div class="math-display">\n${md.utils.escapeHtml(
      tokens[index].content,
    )}</div>\n`;
}

export function renderArticleFigures(md) {
  md.core.ruler.after("inline", "article-figures", (state) => {
    for (let index = 0; index < state.tokens.length - 2; index += 1) {
      const openingToken = state.tokens[index];
      const inlineToken = state.tokens[index + 1];
      const closingToken = state.tokens[index + 2];
      const inlineChildren = inlineToken.children ?? [];

      if (
        openingToken.type !== "paragraph_open" ||
        inlineToken.type !== "inline" ||
        closingToken.type !== "paragraph_close"
      ) {
        continue;
      }

      let imageToken;
      let captionTokens = [];
      const hasCaptionOnNextLine =
        inlineChildren[0]?.type === "image" &&
        ["softbreak", "hardbreak"].includes(inlineChildren[1]?.type) &&
        inlineChildren[2]?.type === "em_open" &&
        inlineChildren[2]?.markup === "*" &&
        inlineChildren.at(-1)?.type === "em_close" &&
        inlineChildren.at(-1)?.markup === "*";

      if (hasCaptionOnNextLine) {
        imageToken = inlineChildren[0];
        captionTokens = inlineChildren.slice(3, -1);
        inlineToken.children = [imageToken];
      } else if (
        inlineChildren.length === 1 &&
        inlineChildren[0].type === "image"
      ) {
        imageToken = inlineChildren[0];

        const captionOpeningToken = state.tokens[index + 3];
        const captionInlineToken = state.tokens[index + 4];
        const captionClosingToken = state.tokens[index + 5];
        const captionChildren = captionInlineToken?.children ?? [];
        const hasCaptionInNextParagraph =
          captionOpeningToken?.type === "paragraph_open" &&
          captionInlineToken?.type === "inline" &&
          captionClosingToken?.type === "paragraph_close" &&
          captionChildren[0]?.type === "em_open" &&
          captionChildren[0]?.markup === "*" &&
          captionChildren.at(-1)?.type === "em_close" &&
          captionChildren.at(-1)?.markup === "*";

        if (hasCaptionInNextParagraph) {
          captionTokens = captionChildren.slice(1, -1);
          state.tokens.splice(index + 3, 3);
        }
      } else {
        continue;
      }

      openingToken.type = "figure_open";
      openingToken.tag = "figure";
      openingToken.attrJoin("class", "post-figure");
      closingToken.type = "figure_close";
      closingToken.tag = "figure";
      imageToken.meta = {
        ...imageToken.meta,
        articleFigure: true,
        captionTokens,
      };
    }
  });

  const defaultImageRenderer =
    md.renderer.rules.image ??
    ((tokens, index, options, env, renderer) =>
      renderer.renderToken(tokens, index, options));

  md.renderer.rules.image = (tokens, index, options, env, renderer) => {
    const token = tokens[index];

    if (!token.meta?.articleFigure) {
      return defaultImageRenderer(tokens, index, options, env, renderer);
    }

    const alt = renderer.renderInlineAsText(token.children, options, env);
    token.attrSet("alt", alt);

    const image = `<img${renderer.renderAttrs(token)}>`;
    const figcaption = token.meta.captionTokens.length
      ? `<figcaption>${renderer.renderInline(
          token.meta.captionTokens,
          options,
          env,
        )}</figcaption>`
      : "";

    return `${image}${figcaption}`;
  };
}

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

  eleventyConfig.addFilter(
    "categoryUrl",
    (category) => `/blog/categories/${categorySlug(category)}/`,
  );

  const markdownLibrary = markdownIt({
    html: true,
    linkify: true,
    typographer: false,
  })
    .use(preserveLatexMath)
    .use(renderArticleFigures)
    .use(preserveLatexNegativeSpace);

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addCollection("blogPosts", getBlogPosts);

  eleventyConfig.addCollection("blogCategories", (collectionApi) => {
    const categories = new Map();

    for (const post of getBlogPosts(collectionApi)) {
      for (const category of post.data.categories ?? []) {
        if (!categories.has(category)) {
          categories.set(category, {
            name: category,
            slug: categorySlug(category),
            posts: [],
          });
        }

        categories.get(category).posts.push(post);
      }
    }

    return [...categories.values()].sort((a, b) =>
      a.name.localeCompare(b.name, "ja"),
    );
  });

  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy(
    "src/blog/posts/**/*.{avif,gif,jpeg,jpg,png,svg,webp}",
    { mode: "html-relative" },
  );
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
