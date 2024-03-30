import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    const email = 'Moses.Armstrong@Feest.ca';
    const password = 'test1';

    // Act
    await loginPage.goto();
    await loginPage.login(email, password);

    // Assert
    const title = await welcomePage.getTitle();
    expect(title).toContain('Welcome');
  });
});
