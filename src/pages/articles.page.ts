import { MainMenuComponent } from '@_src/components/main-menu.component';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';

  addArticleButtonLogged = this.page.locator('#add-new');
  searchArticleInput = this.page.getByTestId('search-input');
  searchArticleIcon = this.page.getByTestId('search-button');
  noResultText = this.page.getByTestId('no-results');

  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async goToArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }

  async searchArticle(phrase: string): Promise<void> {
    await this.searchArticleInput.fill(phrase);
    await this.searchArticleIcon.click();
  }
}
