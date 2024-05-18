import { AddArticleModel } from '@_src/models/article.model';
import { Page } from '@playwright/test';

export class AddArticleView {
  addNewArticleHeader = this.page.getByRole('heading', {
    name: 'Add New Entry',
  });
  articleTitleInput = this.page.getByTestId('title-input');
  articleBodyInput = this.page.getByTestId('body-text');
  saveArticleButton = this.page.getByTestId('save');

  errorPopUp = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async createNewArticle(addArticle: AddArticleModel): Promise<void> {
    await this.articleTitleInput.fill(addArticle.title);
    await this.articleBodyInput.fill(addArticle.body);
    await this.saveArticleButton.click();
  }
}
