import { createRandomArticle } from '../src/factories/article.factory';
import { AddArticle } from '../src/models/article.model';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let addArticle: AddArticle;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    addArticle = createRandomArticle();

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
  });

  test('add an article with mandatory fields @GAD-R04-01', async ({ page }) => {
    // Arrange
    const articlePage = new ArticlePage(page);
    const expectedSuccessText = 'Article was created';

    // Act
    await expect.soft(addArticleView.header).toBeVisible();
    await addArticleView.createNewArticle(addArticle);

    // Assert
    await expect
      .soft(articlePage.articleCreatedPopUp)
      .toHaveText(expectedSuccessText);
    await expect.soft(articlePage.articleTitle).toHaveText(addArticle.title);
    await expect.soft(articlePage.articleBody).toHaveText(addArticle.body);
  });

  test('reject add an article without title @GAD-R04-01', async () => {
    // Arrange
    addArticle.title = '';
    const expectedErrorText = 'Article was not created';

    // Act
    await addArticleView.createNewArticle(addArticle);

    // Assert
    await expect(addArticleView.errorPopUp).toHaveText(expectedErrorText);
  });

  test('reject add an article without body @GAD-R04-01', async () => {
    // Arrange
    addArticle.body = '';
    const expectedErrorText = 'Article was not created';

    // Act
    await addArticleView.createNewArticle(addArticle);

    // Assert
    await expect(addArticleView.errorPopUp).toHaveText(expectedErrorText);
  });
});
