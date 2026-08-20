import assert from "node:assert/strict";
import test from "node:test";

import { createMarkdownLibrary } from "../eleventy.config.js";

const markdown = createMarkdownLibrary();

test("renders numbered footnote references and bibliography entries", () => {
  const source = `文献を参照します。[^1]

## 参考文献

[^1]: 山田太郎『Markdown入門』技術出版、2025年。`;
  const rendered = markdown.render(source);

  assert.match(
    rendered,
    /<sup class="footnote-ref"><a href="#fn1" id="fnref1">\[1\]<\/a><\/sup>/,
  );
  assert.match(rendered, /<li id="fn1" class="footnote-item">/);
  assert.match(
    rendered,
    /<a href="#fnref1" class="footnote-backref">↩︎<\/a>/,
  );
  assert.doesNotMatch(rendered, /\[\^1\]/);
});

test("supports repeated references to the same footnote", () => {
  const rendered = markdown.render("最初[^note]、再掲[^note]。\n\n[^note]: 出典");

  assert.match(rendered, /id="fnref1"/);
  assert.match(rendered, /id="fnref1:1"/);
  assert.match(rendered, /href="#fnref1:1"/);
});
