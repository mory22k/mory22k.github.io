import assert from "node:assert/strict";
import test from "node:test";
import markdownIt from "markdown-it";

import {
  preserveLatexMath,
  renderArticleFigures,
} from "../eleventy.config.js";

const markdown = markdownIt()
  .use(preserveLatexMath)
  .use(renderArticleFigures);

test("renders a standalone image as a centered article figure hook", () => {
  assert.equal(
    markdown.render("![Energy spectrum](./energy-spectrum.svg)"),
    '<figure class="post-figure">' +
      '<img src="./energy-spectrum.svg" alt="Energy spectrum"></figure>\n',
  );
});

test("uses an emphasized line after the image as a caption", () => {
  const source = String.raw`![Energy spectrum](./energy-spectrum.svg)
*Energy levels over $s=t/\tau$ and $E_n(s)$.*`;

  assert.equal(
    markdown.render(source),
    '<figure class="post-figure">' +
      '<img src="./energy-spectrum.svg" alt="Energy spectrum">' +
      String.raw`<figcaption>Energy levels over $s=t/\tau$ and $E_n(s)$.</figcaption></figure>` +
      "\n",
  );
});

test("also accepts an emphasized caption separated by a blank line", () => {
  assert.equal(
    markdown.render(
      "![Energy spectrum](./energy-spectrum.svg)\n\n*Energy levels over time.*",
    ),
    '<figure class="post-figure">' +
      '<img src="./energy-spectrum.svg" alt="Energy spectrum">' +
      "<figcaption>Energy levels over time.</figcaption></figure>\n",
  );
});

test("does not use a Markdown image title as a caption", () => {
  assert.equal(
    markdown.render(
      '![Energy spectrum](./energy-spectrum.svg "Image title")',
    ),
    '<figure class="post-figure">' +
      '<img src="./energy-spectrum.svg" alt="Energy spectrum" title="Image title">' +
      "</figure>\n",
  );
});

test("does not turn an inline image into a figure", () => {
  assert.equal(
    markdown.render("Before ![icon](./icon.svg) after"),
    '<p>Before <img src="./icon.svg" alt="icon"> after</p>\n',
  );
});
