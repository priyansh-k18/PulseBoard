import { expect, test } from "@playwright/test";

test.describe("Personalized Content Dashboard", () => {
  test("loads the personalized feed", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("search-input")).toBeVisible();
    await expect(page.getByTestId("content-card").first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("supports debounced search", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("content-card").first()).toBeVisible({
      timeout: 15_000,
    });

    await page.getByTestId("search-input").fill("AI chips");
    await expect(page.getByTestId("content-card").first()).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText(/AI chips/i).first()).toBeVisible();
  });

  test("favorites flow works", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("content-card").first()).toBeVisible({
      timeout: 15_000,
    });

    await page.getByTestId("favorite-toggle").first().click();
    await page.getByTestId("nav-favorites").click();
    await expect(page.getByTestId("favorites-grid")).toBeVisible();
    await expect(page.getByTestId("content-card").first()).toBeVisible();
  });

  test("updates preferences from settings", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("nav-settings").click();
    await expect(page.getByTestId("settings-panel")).toBeVisible();

    await page.getByTestId("display-name-input").fill("Alex Intern");
    await page.getByTestId("category-science").click();
    await page.getByTestId("dark-mode-switch").click();

    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.getByTestId("account-button")).toContainText(
      "Alex Intern",
    );
  });

  test("drag handle is available for reordering", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("sortable-feed")).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByTestId("drag-handle").first()).toBeVisible();
  });
});
