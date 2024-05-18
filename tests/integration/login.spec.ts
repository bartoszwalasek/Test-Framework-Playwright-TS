import { LoginUserModel } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;
  let loginUser: LoginUserModel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loginUser = testUser1;
    await loginPage.goto();
  });

  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const welcomePage = new WelcomePage(page);
    const expectedWelcomeTitle = 'Welcome';

    // Act
    await loginPage.login(testUser1);

    // Assert
    const title = await welcomePage.getTitle();
    expect(title).toContain(expectedWelcomeTitle);
  });

  test('reject login with incorrect password @GAD-R02-01', async () => {
    // Arrange
    loginUser.userPassword = 'incorrectPassword';
    const expectedLoginTitle = 'Login';
    const expectedErrorText = 'Invalid username or password';

    // Act
    await loginPage.login(loginUser);

    // Assert
    const title = await loginPage.getTitle();
    expect.soft(title).toContain(expectedLoginTitle);
    await expect.soft(loginPage.loginError).toHaveText(expectedErrorText);
  });
});
