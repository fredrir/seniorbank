import { expect, test } from "vitest";
import { sum } from "./utils";

test("adds 1 + 2 to equal 3", () => {
  expect(sum({ a: 1, b: 2 })).toBe(3);
});
