import { createRandomArticle } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create verify and delete article', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
  });

  test('add an article with mandatory fields @GAD-R04-01', async () => {
    // Arrange
    articleData = createRandomArticle();
    const expectedSuccessText = 'Article was created';

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.addNewArticleHeader).toBeVisible();
    await addArticleView.createNewArticle(articleData);

    // Assert
    await expect
      .soft(articlePage.articleCreatedPopUp)
      .toHaveText(expectedSuccessText);
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
  });

  test('user can access single article @GAD-R04-03', async () => {
    // Act
    await articlesPage.goToArticle(articleData.title);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
  });

  test('user can delete his own article @GAD-R04-04', async () => {
    // Arrange
    const expectedNoResultText = 'No data';
    await articlesPage.goToArticle(articleData.title);

    // Act
    await articlePage.deleteArticle();

    // Assert
    await articlesPage.waitForPageToLoadUrl();
    const title = await articlesPage.getTitle();
    expect.soft(title).toContain('Articles');

    await articlesPage.searchArticle(articleData.title);
    await expect
      .soft(articlesPage.noResultText)
      .toHaveText(expectedNoResultText);
  });
});
