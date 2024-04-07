import { createRandomArticle } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  test('add an article with mandatory fields @GAD-R04-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const addArticleView = new AddArticleView(page);
    const articlePage = new ArticlePage(page);

    const addArticle = createRandomArticle();
    const expectedSuccessText = 'Article was created';

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.header).toBeVisible();

    await addArticleView.createNewArticle(addArticle);

    // Assert
    await expect
      .soft(articlePage.articleCreatedPopUp)
      .toHaveText(expectedSuccessText);
    await expect.soft(articlePage.articleTitle).toHaveText(addArticle.title);
    await expect.soft(articlePage.articleBody).toHaveText(addArticle.body);
  });
});
