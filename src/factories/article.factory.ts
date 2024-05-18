import { AddArticleModel } from '@_src/models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function createRandomArticle(
  titleLength?: number,
  bodyParagraphs = 5,
): AddArticleModel {
  let title: string;

  titleLength
    ? (title = faker.string.alpha(titleLength))
    : (title = faker.lorem.sentence());

  const body = faker.lorem.paragraph(bodyParagraphs);

  const newArticle: AddArticleModel = { title: title, body: body };

  return newArticle;
}
