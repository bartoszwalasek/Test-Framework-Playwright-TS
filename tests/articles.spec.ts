import { createRandomArticle } from '../src/factories/article.factory';
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

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
  });

  test('add an article with mandatory fields @GAD-R04-01', async ({ page }) => {
    // Arrange
    const articlePage = new ArticlePage(page);

    const articleData = createRandomArticle();
    const expectedSuccessText = 'Article was created';

    // Act
    await expect.soft(addArticleView.header).toBeVisible();
    await addArticleView.createNewArticle(articleData);

    // Assert
    await expect
      .soft(articlePage.articleCreatedPopUp)
      .toHaveText(expectedSuccessText);
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
  });

  test('reject adding an article without title @GAD-R04-01', async () => {
    // Arrange
    const articleData = createRandomArticle();
    articleData.title = '';
    const expectedErrorText = 'Article was not created';

    // Act
    await addArticleView.createNewArticle(articleData);

    // Assert
    await expect(addArticleView.errorPopUp).toHaveText(expectedErrorText);
  });

  test('reject adding an article without body @GAD-R04-01', async () => {
    // Arrange
    const articleData = createRandomArticle();
    articleData.body = '';
    const expectedErrorText = 'Article was not created';

    // Act
    await addArticleView.createNewArticle(articleData);

    // Assert
    await expect(addArticleView.errorPopUp).toHaveText(expectedErrorText);
  });
  test.describe('Title length', () => {
    test('reject adding an article with title exceeding 128 signs @GAD-R04-02', async () => {
      // Arrange
      const articleData = createRandomArticle(129);
      const expectedErrorText = 'Article was not created';

      // Act
      await addArticleView.createNewArticle(articleData);

      // Assert
      await expect(addArticleView.errorPopUp).toHaveText(expectedErrorText);
    });

    test('add an article with title with 128 signs @GAD-R04-02', async ({
      page,
    }) => {
      // Arrange
      const articlePage = new ArticlePage(page);

      const articleData = createRandomArticle(128);
      const expectedSuccessText = 'Article was created';

      // Act
      await addArticleView.createNewArticle(articleData);

      // Assert
      await expect
        .soft(articlePage.articleCreatedPopUp)
        .toHaveText(expectedSuccessText);
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    });
  });
});
