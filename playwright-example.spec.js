import { test, expect } from '@playwright/test';

test('crear un caballero desde la interfaz', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('http://127.0.0.1:8000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.getByTestId('tab-warriors').click();
  await page.waitForTimeout(1000);
  await page.getByTestId('btn-create').click();
  await page.waitForTimeout(1000);

  await page.getByTestId('field-nombre').fill('Aldo');
  await page.waitForTimeout(500);
  await page.getByTestId('field-raza-id').selectOption({ index: 1 });
  await page.waitForTimeout(500);
  await page.getByTestId('field-arma-id').selectOption({ index: 1 });
  await page.waitForTimeout(500);
  await page.getByTestId('field-vida').fill('120');
  await page.waitForTimeout(500);
  await page.getByTestId('field-cosmo').fill('90');
  await page.waitForTimeout(500);
  await page.getByTestId('field-armadura-nombre').fill('Escudo de Loto');
  await page.waitForTimeout(500);
  await page.getByTestId('field-armadura-resistencia').fill('15');
  await page.waitForTimeout(500);

  await page.getByTestId('btn-add-power').click();
  await page.waitForTimeout(500);
  const powerRows = page.locator('.power-row');
  await powerRows.nth(0).locator('[data-testid="field-poder-nombre"]').fill('Rayo Solar');
  await powerRows.nth(0).locator('[data-testid="field-poder-dano"]').fill('25');
  await powerRows.nth(0).locator('[data-testid="field-poder-consumo"]').fill('12');

  await page.getByTestId('btn-submit').click();
  await page.waitForTimeout(2000);

  await expect(page.getByText('Registro creado')).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(1000);
  await expect(page.locator('table')).toContainText('Aldo', { timeout: 10000 });
});
