import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const URL = "http://localhost:3000";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const logs = [];
page.on("console", (m) => logs.push({ type: m.type(), text: m.text() }));
page.on("pageerror", (e) => logs.push({ type: "pageerror", text: String(e) }));

function step(name) {
  console.log(`\n▶ ${name}`);
}

// 1. Load page + initial a11y scan
step("Load /");
await page.goto(URL, { waitUntil: "networkidle" });

const a11y1 = await new AxeBuilder({ page }).analyze();
console.log(`  Contact a11y violations: ${a11y1.violations.length}`);
for (const v of a11y1.violations) {
  console.log(`   - [${v.impact}] ${v.id}: ${v.description}`);
  for (const n of v.nodes) {
    console.log(`      target: ${n.target.join(" ")}`);
    console.log(`      ${n.failureSummary?.split("\n").slice(0, 2).join(" | ")}`);
  }
}

// 2. Try to submit with empty fields
step("Submit empty Contact form");
await page.getByRole("button", { name: /continue/i }).click();
await page.waitForTimeout(300);
const emptyErrors = await page.locator('[aria-invalid="true"]').count();
console.log(`  Fields flagged aria-invalid: ${emptyErrors}`);

// 3. Fill with bad email first, then valid
step("Fill Contact with invalid email");
await page.getByLabel("Full Name").fill("Jane Doe");
await page.getByLabel("Email").fill("not-an-email");
await page.getByLabel("Phone").fill("5551234567");
await page.getByLabel("Visit reason").fill("Botox consultation");
await page.getByRole("button", { name: /continue/i }).click();
await page.waitForTimeout(300);
const emailError = await page.locator('#email-error').textContent().catch(() => null);
console.log(`  Email error text: ${emailError}`);

step("Fix email + continue");
await page.getByLabel("Email").fill("jane@example.com");
await page.getByRole("button", { name: /continue/i }).click();
await page.waitForTimeout(500);

// 4. Payment screen a11y + validation
step("Payment screen loaded?");
const paymentHeader = await page.getByText("Secure your appointment by card").isVisible();
console.log(`  Payment header visible: ${paymentHeader}`);

const a11y2 = await new AxeBuilder({ page }).analyze();
console.log(`  Payment a11y violations: ${a11y2.violations.length}`);
for (const v of a11y2.violations) console.log(`   - [${v.impact}] ${v.id}: ${v.description}`);

step("Submit empty payment");
await page.getByRole("button", { name: /book appointment/i }).click();
await page.waitForTimeout(300);
console.log(`  Payment aria-invalid count: ${await page.locator('[aria-invalid="true"]').count()}`);

step("Fill payment");
await page.getByPlaceholder("1234 1234 1234 1234").fill("4242 4242 4242 4242");
await page.getByPlaceholder("MM / YY").fill("1230");
await page.getByPlaceholder("CVV").fill("123");
await page.getByPlaceholder("Billing zip code").fill("92108");

step("Check cancellation ack");
await page.locator('#cancellationAck').check();

step("Submit payment");
await page.getByRole("button", { name: /book appointment/i }).click();
await page.waitForTimeout(600);

step("Confirmation screen?");
const bookedHeader = await page
  .getByText("Your appointment has been booked!")
  .isVisible();
console.log(`  "appointment booked" visible: ${bookedHeader}`);

const a11y3 = await new AxeBuilder({ page }).analyze();
console.log(`  Confirmation a11y violations: ${a11y3.violations.length}`);
for (const v of a11y3.violations) console.log(`   - [${v.impact}] ${v.id}: ${v.description}`);

// 5. Console log payload
step("Console logs captured");
for (const l of logs) console.log(`  [${l.type}] ${l.text}`);

// 6. Screenshots
step("Screenshots");
await page.goto(URL);
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForLoadState("networkidle");
await page.screenshot({ path: "/tmp/moxie-contact-desktop.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
await page.screenshot({ path: "/tmp/moxie-contact-mobile.png", fullPage: true });

await browser.close();
console.log("\n✔ done");
