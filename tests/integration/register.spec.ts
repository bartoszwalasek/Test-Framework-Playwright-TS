import { createRandomUser } from '@_src/factories/user.factory';
import { RegisterUserModel } from '@_src/models/user.model';
import { LoginPage } from '@_src/pages/login.page';
import { RegisterPage } from '@_src/pages/register.page';
import { WelcomePage } from '@_src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUser: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUser = createRandomUser();
    await registerPage.goto();
  });

  test('register with correct credentials and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    const expectedRegisterSuccessText = 'User created';
    const expectedLoginTitle = 'Login';
    const expectedWelcomeTitle = 'Welcome';

    // Act
    await registerPage.register(registerUser);

    // Assert
    await expect
      .soft(registerPage.registerSuccess)
      .toHaveText(expectedRegisterSuccessText);

    await loginPage.waitForPageToLoadUrl();
    const loginTitle = await loginPage.getTitle();
    expect.soft(loginTitle).toContain(expectedLoginTitle);

    // Assert
    await loginPage.login({
      userEmail: registerUser.userEmail,
      userPassword: registerUser.userPassword,
    });
    const welcomeTitle = await welcomePage.getTitle();
    expect(welcomeTitle).toContain(expectedWelcomeTitle);
  });

  test('not register with incorrect credentials - not valid email @GAD-R03-04', async () => {
    // Arrange
    registerUser.userEmail = '!@#qwerty';
    const expectedErrorText = 'Please provide a valid email address';

    // Act
    await registerPage.register(registerUser);

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });

  test('not register with incorrect credentials - email not provided @GAD-R03-04', async () => {
    // Arrange
    const expectedErrorText = 'This field is required';

    // Act
    await registerPage.userFirstNameInput.fill(registerUser.userFirstName);
    await registerPage.userLastNameInput.fill(registerUser.userLastName);
    await registerPage.userPasswordInput.fill(registerUser.userPassword);
    await registerPage.registerButton.click();

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
