import { AddCommentModel } from '../models/comment.model';
import { Page } from '@playwright/test';

export class EditCommentView {
  commentBodyInput = this.page.getByTestId('body-input');
  updateCommentButton = this.page.getByTestId('update-button');

  constructor(private page: Page) {}

  async updateComment(commentData: AddCommentModel): Promise<void> {
    await this.commentBodyInput.fill(commentData.body);
    await this.updateCommentButton.click();
  }
}
