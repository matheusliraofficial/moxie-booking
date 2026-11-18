import { test, expect } from "@playwright/test";

test("mobile viewport stacks the two cards vertically", async ({ page, viewport }) => {
  // mobile project runs with iPhone 13 viewport by default; skip for desktop
  test.skip(!viewport || viewport.width > 500, "mobile project only");
  await page.goto("/");

  const businessCard = page.getByText("Gold Spa").first();
  const formCard = page.getByRole("heading", { name: /enter your details below/i });

<<<<<<< HEAD
  const [b, f] = await Promise.all([businessCard.boundingBox(), formCard.boundingBox()]);
=======
  const [b, f] = await Promise.all([
    businessCard.boundingBox(),
    formCard.boundingBox(),
  ]);
>>>>>>> origin/main
  expect(b, "business card box").not.toBeNull();
  expect(f, "form box").not.toBeNull();
  // Form sits below the business card on mobile.
  expect(f!.y).toBeGreaterThan(b!.y);
});

test("desktop viewport places the two cards side-by-side", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width < 1000, "desktop project only");
  await page.goto("/");

  const businessCard = page.getByText("Gold Spa").first();
  const formCard = page.getByRole("heading", { name: /enter your details below/i });

<<<<<<< HEAD
  const [b, f] = await Promise.all([businessCard.boundingBox(), formCard.boundingBox()]);
=======
  const [b, f] = await Promise.all([
    businessCard.boundingBox(),
    formCard.boundingBox(),
  ]);
>>>>>>> origin/main
  expect(b, "business card box").not.toBeNull();
  expect(f, "form box").not.toBeNull();
  // Side-by-side: y positions overlap, form starts to the right of the business card.
  expect(f!.x).toBeGreaterThan(b!.x);
});
