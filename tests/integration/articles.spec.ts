import { createRandomArticle } from '@_src/factories/article.factory';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
  });

  test('reject adding an article without title @GAD-R04-01 @logged', async () => {
    // Arrange
    const articleData = createRandomArticle();
    articleData.title = '';
    const expectedErrorText = 'Article was not created';

    // Act
    await addArticleView.createNewArticle(articleData);

    // Assert
    await expect(addArticleView.errorPopUp).toHaveText(expectedErrorText);
  });

  test('reject adding an article without body @GAD-R04-01 @logged', async () => {
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
    test('reject adding an article with title exceeding 128 signs @GAD-R04-02 @logged', async () => {
      // Arrange
      const articleData = createRandomArticle(129);
      const expectedErrorText = 'Article was not created';

      // Act
      await addArticleView.createNewArticle(articleData);

      // Assert
      await expect(addArticleView.errorPopUp).toHaveText(expectedErrorText);
    });

    test('add an article with title with 128 signs @GAD-R04-02 @logged', async ({
      page,
    }) => {
      // Arrange
      const articlePage = new ArticlePage(page);

      const articleData = createRandomArticle(128);
      const expectedSuccessText = 'Article was created';

      // Act
      await addArticleView.createNewArticle(articleData);

      // Assert
      await expect.soft(articlePage.alertPopUp).toHaveText(expectedSuccessText);
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    });
  });
});
