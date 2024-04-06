import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/article.html';

  articleTitle = this.page.getByTestId('article-title');
  articleBody = this.page.getByTestId('article-body');

  articleCreatedPopUp = this.page.getByTestId('alert-popup');

  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }
}
