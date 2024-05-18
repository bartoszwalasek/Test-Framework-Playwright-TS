import { AddCommentModel } from '@_src/models/comment.model';
import { Page } from '@playwright/test';

export class AddCommentView {
  addNewCommentHeader = this.page.getByRole('heading', {
    name: 'Add New Comment',
  });
  commentBodyInput = this.page.locator('#body');
  saveCommentButton = this.page.getByRole('button', { name: 'Save' });

  constructor(private page: Page) {}

  async addComment(commentData: AddCommentModel): Promise<void> {
    await this.commentBodyInput.fill(commentData.body);
    await this.saveCommentButton.click();
  }
}
