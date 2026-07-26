import assert from "node:assert/strict";
import test from "node:test";
import markdownIt from "markdown-it";

import { preserveLatexMath } from "../eleventy.config.js";

const markdown = markdownIt().use(preserveLatexMath);

test("does not parse underscores in inline math as emphasis", () => {
  const source = String.raw`$\hat{H}_0 = \hat{H}_1$`;

  assert.equal(markdown.renderInline(source), source);
});

test("does not parse underscores in multiline display math as emphasis", () => {
  const source = String.raw`$$
\hat{H}_0 = - \sum_{i=1}^{N} \hat{\sigma}_i^x.
$$`;
  const expected = `<div class="math-display">\n${source}</div>\n`;

  assert.equal(markdown.render(source), expected);
  assert.doesNotMatch(markdown.render(source), /<em>/);
});

test("does not parse equation alignment as Markdown headings", () => {
  const source = String.raw`$$
  \hat{H}_1
  =
  -\hat{\sigma}_1^z\hat{\sigma}_2^z
  -\hat{\sigma}_2^z\hat{\sigma}_3^z
$$`;
  const rendered = markdown.render(source);

  assert.equal(rendered, `<div class="math-display">\n${source}</div>\n`);
  assert.doesNotMatch(rendered, /<h[1-6]>/);
});

test("wraps display math so its spacing does not depend on KaTeX internals", () => {
  assert.equal(
    markdown.render("$$\nx = 1\n$$"),
    '<div class="math-display">\n$$\nx = 1\n$$</div>\n',
  );
});

test("leaves unmatched display delimiters to the regular parser", () => {
  const source = "$$\ntext";

  assert.equal(markdown.render(source), "<p>$$\ntext</p>\n");
});

test("still parses emphasis outside math", () => {
  assert.equal(
    markdown.renderInline(String.raw`*important* and $x_1 + y_2$`),
    String.raw`<em>important</em> and $x_1 + y_2$`,
  );
});

test("does not linkify or parse HTML inside math", () => {
  const linkifyingMarkdown = markdownIt({
    html: true,
    linkify: true,
  }).use(preserveLatexMath);

  assert.equal(
    linkifyingMarkdown.renderInline("$x < https://example.com_a$"),
    "$x &lt; https://example.com_a$",
  );
});

test("keeps escaped dollar signs from opening math", () => {
  assert.equal(
    markdown.renderInline(String.raw`Price: \$5 and *important*`),
    "Price: $5 and <em>important</em>",
  );
});
