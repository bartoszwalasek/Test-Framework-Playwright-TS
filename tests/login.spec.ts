import { LoginUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(testUser1);

    // Assert
    const title = await welcomePage.getTitle();
    expect(title).toContain('Welcome');
  });

  test('reject login with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    const loginUser: LoginUser = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    // Act
    await loginPage.goto();
    await loginPage.login(loginUser);

    // Assert
    const title = await loginPage.getTitle();
    expect.soft(title).toContain('Login');
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');
  });
});
