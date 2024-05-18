import { createRandomArticle } from '@_src/factories/article.factory';
import { createRandomComment } from '@_src/factories/comment.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { AddCommentModel } from '@_src/models/comment.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentPage } from '@_src/pages/comment.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { AddCommentView } from '@_src/views/add-comment.view';
import { EditCommentView } from '@_src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    articleData = createRandomArticle();

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createNewArticle(articleData);
  });

  test('operate on comment @GAD-R05-01 @GAD-R05-02 @logged', async () => {
    const commentData = createRandomComment();

    await test.step('create a new comment', async () => {
      // Arrange
      const expectedSuccessText = 'Comment was created';

      // Act
      await articlePage.addCommentButton.click();
      await expect.soft(addCommentView.addNewCommentHeader).toBeVisible();
      await addCommentView.addComment(commentData);

      // Assert
      await expect.soft(articlePage.alertPopUp).toHaveText(expectedSuccessText);
    });

    await test.step('verify comment in article page', async () => {
      // Arrange
      const articleComment = articlePage.getArticleComment(commentData.body);

      // Act
      await expect(articleComment.body).toHaveText(commentData.body);
      await articleComment.link.click();

      // Assert
      await expect(commentPage.commentBody).toHaveText(commentData.body);
    });

    let editCommentData: AddCommentModel;
    await test.step('update comment', async () => {
      // Arrange
      const expectedSuccessEditText = 'Comment was updated';
      editCommentData = createRandomComment();

      // Act
      await commentPage.editButton.click();
      await editCommentView.updateComment(editCommentData);

      // Assert
      await expect
        .soft(commentPage.alertPopUp)
        .toHaveText(expectedSuccessEditText);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('verify updated comment in article page', async () => {
      // Act
      await commentPage.returnLink.click();
      const updatedArticleComment = articlePage.getArticleComment(
        editCommentData.body,
      );

      // Assert
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    });
  });

  test('operate on second comment @GAD-R05-03 @logged', async () => {
    await test.step('create first comment', async () => {
      // Arrange
      const commentData = createRandomComment();
      const expectedSuccessText = 'Comment was created';

      // Act
      await articlePage.addCommentButton.click();
      await addCommentView.addComment(commentData);

      // Assert
      await expect.soft(articlePage.alertPopUp).toHaveText(expectedSuccessText);
    });

    await test.step('create and verify second comment', async () => {
      const secondCommentBody =
        await test.step('create second comment', async () => {
          const secondCommentData = createRandomComment();
          await articlePage.addCommentButton.click();
          await addCommentView.addComment(secondCommentData);
          return secondCommentData.body;
        });

      await test.step('verify second comment', async () => {
        const articleComment = articlePage.getArticleComment(secondCommentBody);
        await expect(articleComment.body).toHaveText(secondCommentBody);

        await articleComment.link.click();
        await expect(commentPage.commentBody).toHaveText(secondCommentBody);
      });
    });
  });
});
