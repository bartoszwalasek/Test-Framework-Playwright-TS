import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    const email = testUser1.userEmail;
    const password = testUser1.userPassword;

    // Act
    await loginPage.goto();
    await loginPage.login(email, password);

    // Assert
    const title = await welcomePage.getTitle();
    expect(title).toContain('Welcome');
  });
});
