import { createRandomArticle } from '@_src/factories/article.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create verify and delete article', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);

    await articlesPage.goto();
  });

  test('add an article with mandatory fields @GAD-R04-01 @logged', async () => {
    // Arrange
    articleData = createRandomArticle();
    const expectedSuccessText = 'Article was created';

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.addNewArticleHeader).toBeVisible();
    await addArticleView.createNewArticle(articleData);

    // Assert
    await expect.soft(articlePage.alertPopUp).toHaveText(expectedSuccessText);
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
  });

  test('user can access single article @GAD-R04-03 @logged', async () => {
    // Act
    await articlesPage.goToArticle(articleData.title);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
  });

  test('user can delete his own article @GAD-R04-04 @logged', async () => {
    // Arrange
    const expectedArticlesTitle = 'Articles';
    const expectedNoResultText = 'No data';

    await articlesPage.goToArticle(articleData.title);

    // Act
    await articlePage.deleteArticle();

    // Assert
    await articlesPage.waitForPageToLoadUrl();
    const title = await articlesPage.getTitle();
    expect.soft(title).toContain(expectedArticlesTitle);

    await articlesPage.searchArticle(articleData.title);
    await expect
      .soft(articlesPage.noResultText)
      .toHaveText(expectedNoResultText);
  });
});
