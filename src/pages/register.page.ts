import { RegisterUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';
  userFirstNameInput = this.page.getByTestId('firstname-input');
  userLastNameInput = this.page.getByTestId('lastname-input');
  userEmailInput = this.page.getByTestId('email-input');
  userPasswordInput = this.page.getByTestId('password-input');
  registerButton = this.page.getByTestId('register-button');
  registerSuccess = this.page.getByTestId('alert-popup');

  constructor(page: Page) {
    super(page);
  }

  async register(registerUser: RegisterUser): Promise<void> {
    await this.userFirstNameInput.fill(registerUser.userFirstName);
    await this.userLastNameInput.fill(registerUser.userLastName);
    await this.userEmailInput.fill(registerUser.userEmail);
    await this.userPasswordInput.fill(registerUser.userPassword);
    await this.registerButton.click();
  }
}
