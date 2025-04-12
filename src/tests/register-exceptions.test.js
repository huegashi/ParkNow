import { test, expect } from '@playwright/test';

test.describe('Registration Form Validation Tests', () => {
  const baseURL = 'http://localhost:5173';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    const loginButton = page.getByRole('button', { name: 'Register' });
    await loginButton.click();
    await page.waitForLoadState('domcontentloaded');
  });

  test('invalid_email_format_validation', async ({ page }) => {
    await page.fill('#email', 'invalidemail');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.fill('#confirm-password', 'Password123!');
    await page.click('button.login-button');
    
    const alertMessage = await page.evaluate(() => window.alert);
    expect(alertMessage).toContain('Please enter a valid email address');
  });

  test('registration_validation_empty_email', async ({ page }) => {
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.fill('#confirm-password', 'Password123!');
    // Deliberately leaving email field empty
    await page.fill('#email', '');  // explicitly setting empty email
    
    await page.click('button.login-button');
    const alertMessage = await page.evaluate(() => window.alert);
    expect(alertMessage).toContain('Please enter a valid email address');
  });

  test('registration_validation_empty_password', async ({ page }) => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#username', 'testuser');
    await page.fill('#confirm-password', 'Password123!');
    // Deliberately leaving password field empty
    await page.fill('#password', '');  // explicitly setting empty password
    
    await page.click('button.login-button');
    
    const alertMessage = await page.evaluate(() => window.alert);
    expect(alertMessage).toContain('Password must be at least 8 characters long');
  });

  test('password_length_validation', async ({ page }) => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Pass1');
    await page.fill('#confirm-password', 'Pass1');
    
    await page.click('button.login-button');
    
    const alertMessage = await page.evaluate(() => window.alert);
    expect(alertMessage).toContain('Password must be at least 8 characters long');
  });

  test('password_uppercase_validation', async ({ page }) => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123!');
    await page.fill('#confirm-password', 'password123!');
    
    await page.click('button.login-button');
    const alertMessage = await page.evaluate(() => window.alert);
    expect(alertMessage).toContain('Password must contain at least one uppercase letter');
  });

  test('password_digit_validation', async ({ page }) => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password!');
    await page.fill('#confirm-password', 'Password!');
    
    await page.click('button.login-button');
    const alertMessage = await page.evaluate(() => window.alert);
    expect(alertMessage).toContain('Password must contain at least one digit');
  });

  test('password_mismatch_validation', async ({ page }) => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.fill('#confirm-password', 'Password123@');
    await page.click('button.login-button');
    
    const alertMessage = await page.evaluate(() => window.alert);
    expect(alertMessage).toContain('Passwords do not match');
  });

  test('successful_registration', async ({ page }) => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.fill('#confirm-password', 'Password123!');
    
    await page.click('button.login-button');
    await expect(page).toHaveURL(`${baseURL}/login`);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });
});
