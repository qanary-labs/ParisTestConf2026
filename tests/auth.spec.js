import { test, expect } from "@playwright/test";

test.describe("Auth flow", () => {
  
  test("J'accède à la page d'administration en me connectant, puis je me déconnecte", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Username").fill("admin");
    await page.getByLabel("Password").fill("password");

    /**
     * 4.b
     * const loginButton = page
        .getByRole('button', { name: /se connecter/i })
        .or(page.getByTestId('login'))
        .or(page.locator('#login'))
        .or(page.locator('button[type="submit"]'));
      * await loginButton.first().click();
     */
    await page.getByRole("button", { name: /se connecter/i }).click();

    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole("heading", { name: /zone admin protegee/i })).toBeVisible();
    await expect(page.getByText(/connecte en tant que admin/i)).toBeVisible();

    await page.getByRole("button", { name: /se deconnecter/i }).click();

    await expect(page).toHaveURL(/\/\?logged_out=1$/);
    await expect(page.getByText(/vous avez ete deconnecte/i)).toBeVisible();
  });
});
