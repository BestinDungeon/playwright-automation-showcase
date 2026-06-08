import { test, expect } from '@playwright/test';

/*
What this test does:
1. Opens SauceDemo login page
2. Logs in with standard user
3. Adds a product to the cart
4. Verifies cart badge updates
5. Starts checkout process
*/

test('SauceDemo full shopping flow', async ({ page }) => {
  // 1. Go to site
  await page.goto('https://www.saucedemo.com/');

  // 2. Login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // 3. Verify we are on inventory page
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.title')).toHaveText('Products');

  // 4. Add item to cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // 5. Verify cart badge shows 1 item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 6. Go to cart
  await page.click('.shopping_cart_link');

  // 7. Verify item is in cart
  await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
});