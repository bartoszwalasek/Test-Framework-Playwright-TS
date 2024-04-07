import { AddArticle } from '../models/article.model';
import { Page } from '@playwright/test';

export class AddArticleView {
  header = this.page.getByRole('heading', { name: 'Add New Entry' });
  articleTitleInput = this.page.getByTestId('title-input');
  articleBodyInput = this.page.getByTestId('body-text');
  saveArticleButton = this.page.getByTestId('save');

  constructor(private page: Page) {}

  async createNewArticle(addArticle: AddArticle): Promise<void> {
    await this.articleTitleInput.fill(addArticle.title);
    await this.articleBodyInput.fill(addArticle.body);
    await this.saveArticleButton.click();
  }
}
