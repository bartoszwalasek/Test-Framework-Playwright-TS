import { createRandomArticle } from '../../src/factories/article.factory';
import { createRandomComment } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    articleData = createRandomArticle();

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createNewArticle(articleData);
  });

  test('create a new comment @GAD-R05-01', async () => {
    // Create comment
    // Arrange
    const expectedSuccessText = 'Comment was created';
    const expectedSuccessEditText = 'Comment was updated';
    const commentData = createRandomComment();

    // Act
    await articlePage.addCommentButton.click();
    await expect.soft(addCommentView.addNewCommentHeader).toBeVisible();
    await addCommentView.addComment(commentData);

    // Assert
    await expect.soft(articlePage.alertPopUp).toHaveText(expectedSuccessText);

    // Verify comment
    // Act
    const articleComment = articlePage.getArticleComment(commentData.body);

    await expect(articleComment.body).toHaveText(commentData.body);
    await articleComment.link.click();

    // Assert
    await expect(commentPage.commentBody).toHaveText(commentData.body);

    // Edit comment
    // Act
    const editCommentData = createRandomComment();

    await commentPage.editButton.click();
    await editCommentView.updateComment(editCommentData);

    // Assert
    await expect.soft(commentPage.commentBody).toHaveText(editCommentData.body);
    await expect
      .soft(commentPage.alertPopUp)
      .toHaveText(expectedSuccessEditText);
    await commentPage.returnLink.click();

    const updatedArticleComment = articlePage.getArticleComment(
      editCommentData.body,
    );
    await expect
      .soft(updatedArticleComment.body)
      .toHaveText(editCommentData.body);
  });
});
