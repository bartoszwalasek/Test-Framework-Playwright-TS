import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-menu.component';
import { Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';

  commentBody = this.page.getByTestId('comment-body');
  editButton = this.page.getByTestId('edit');
  returnLink = this.page.getByTestId('return');

  alertPopUp = this.page.getByTestId('alert-popup');

  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }
}
