import assert from "node:assert/strict";
import test from "node:test";

import { categorySlug } from "../eleventy.config.js";

test("uses stable slugs for existing Japanese categories", () => {
  assert.equal(categorySlug("お知らせ"), "news");
  assert.equal(categorySlug("技術メモ"), "technical-notes");
});

test("creates a URL-safe fallback slug for a new category", () => {
  assert.equal(categorySlug("研究 ノート"), "研究-ノート");
  assert.equal(categorySlug(" Web Development "), "web-development");
});
