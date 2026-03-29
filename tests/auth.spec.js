import { test, expect } from "@playwright/test";

test.describe("Auth flow", () => {
  
  test("J'accède à la page d'administration en me connectant, puis je me déconnecte", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Username").fill("admin");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: /se connecter/i }).click();

    // Claude through terminal. Prompt
    // Lance mes tests Playwright et corrige les en cas d'erreur.
    // Profite en pour utiliser les fonctions de multi-locators de Playwright pour améliorer la robustesse de mes tests.

    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole("heading", { name: /zone admin protégée/i })).toBeVisible();
    await expect(page.getByText(/connecté en tant que admin/i)).toBeVisible();

    await page.getByRole("button", { name: /se déconnecter/i }).click();

    await expect(page).toHaveURL(/\/\?logged_out=1$/);
    await expect(page.getByText(/vous avez été déconnecté/i)).toBeVisible();
  });
});
