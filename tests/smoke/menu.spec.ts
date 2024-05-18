import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const articlesPage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    const expectedCommentsTitle = 'Comments';

    // Act
    await articlesPage.goto();
    await articlesPage.mainMenu.commentsButton.click();

    // Assert
    const title = await commentsPage.getTitle();
    expect(title).toContain(expectedCommentsTitle);
  });

  test('articles button navigates to articles page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const articlesPage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    const expectedArticlesTitle = 'Articles';

    // Act
    await commentsPage.goto();
    await commentsPage.mainMenu.articlesButton.click();

    // Assert
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticlesTitle);
  });

  test('home page button navigates from articles to home page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const articlesPage = new ArticlesPage(page);
    const homePage = new HomePage(page);

    const expectedHomePageTitle = 'GAD';

    // Act
    await articlesPage.goto();
    await articlesPage.mainMenu.homePageButton.click();

    // Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedHomePageTitle);
  });

  test('home page button navigates from comments to home page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const commentsPage = new CommentsPage(page);
    const homePage = new HomePage(page);

    const expectedHomePageTitle = 'GAD';

    // Act
    await commentsPage.goto();
    await commentsPage.mainMenu.homePageButton.click();

    // Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedHomePageTitle);
  });
});
