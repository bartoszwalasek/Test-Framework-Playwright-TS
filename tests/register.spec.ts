import { RegisterUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker/locale/pl';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct credentials and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    // Arrange
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    const registerUser: RegisterUser = {
      userFirstName: faker.person.firstName().replace(/[^A-Za-z]g/, ''),
      userLastName: faker.person.lastName().replace(/[^A-Za-z]g/, ''),
      userEmail: '',
      userPassword: faker.internet.password(),
    };
    registerUser.userEmail = faker.internet.email({
      firstName: registerUser.userFirstName,
      lastName: registerUser.userLastName,
    });

    const expectedRegisterSuccessText = 'User created';

    // Act
    await registerPage.goto();
    await registerPage.register(registerUser);

    // Assert
    await expect
      .soft(registerPage.registerSuccess)
      .toHaveText(expectedRegisterSuccessText);

    await loginPage.waitForPageToLoadUrl();
    const loginTitle = await loginPage.getTitle();
    expect.soft(loginTitle).toContain('Login');

    // Assert
    await loginPage.login(registerUser.userEmail, registerUser.userPassword);
    const welcomeTitle = await welcomePage.getTitle();
    expect(welcomeTitle).toContain('Welcome');
  });
});
