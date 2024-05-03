import { Page } from '@playwright/test';

export class AddCommentView {
  addNewCommentHeader = this.page.getByRole('heading', {
    name: 'Add New Comment',
  });
  commentBodyInput = this.page.locator('#body');
  saveCommentButton = this.page.getByRole('button', { name: 'Save' });

  constructor(private page: Page) {}
}
