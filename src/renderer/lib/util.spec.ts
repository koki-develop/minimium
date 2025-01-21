import { describe, expect, it } from "vitest";
import { httpUrl } from "./util";

describe("httpUrl", () => {
  it.each([
    ["https://example.com/", "https://example.com/"],
    ["http://example.com/", "http://example.com/"],
    ["example.com/", "http://example.com/"],
    ["localhost", "http://localhost/"],
    ["hogefuga", null],
    ["test", null],
  ])("httpUrl(%j) should return %j", (input, expected) => {
    expect(httpUrl(input)).toBe(expected);
  });
});
