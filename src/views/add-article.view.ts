import { Page } from '@playwright/test';

export class AddArticleView {
  header = this.page.getByRole('heading', { name: 'Add New Entry' });
  articleTitleInput = this.page.getByTestId('title-input');
  articleBodyInput = this.page.getByTestId('body-text');
  saveArticleButton = this.page.getByTestId('save');

  constructor(private page: Page) {}
}
