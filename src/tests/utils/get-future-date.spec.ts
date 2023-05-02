import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test("increase date by one year", () => {
  const year = new Date().getFullYear();
  expect(getFutureDate(`${year}-01-01`).getFullYear()).toEqual(2024);
});
