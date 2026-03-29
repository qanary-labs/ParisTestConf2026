import { test, expect } from "@playwright/test";

test.describe("Auth flow", () => {
  
  test("J'accède à la page d'administration en me connectant, puis je me déconnecte", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Username").fill("admin");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: /se connecter/i }).click();

    // VSCode Chat > Playwright Healer agent > Prompt
    // Check if my tests are broken and fix them. Add multiple locator through playwright operator or() based on role, ids, data test etc and use idiomatic functions proper to playwright.

    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole("heading", { name: /zone admin protégée/i })).toBeVisible();
    await expect(page.getByText(/connecté en tant que admin/i)).toBeVisible();

    await page.getByRole("button", { name: /se déconnecter/i }).click();

    await expect(page).toHaveURL(/\/\?logged_out=1$/);
    await expect(page.getByText(/vous avez été déconnecté/i)).toBeVisible();
  });
});
