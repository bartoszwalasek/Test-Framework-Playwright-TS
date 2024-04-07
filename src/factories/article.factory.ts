import { AddArticle } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function createRandomArticle(
  titleLength?: number,
  bodyParagraphs = 5,
): AddArticle {
  let title: string;

  titleLength
    ? (title = faker.string.alpha(titleLength))
    : (title = faker.lorem.sentence());

  const body = faker.lorem.paragraph(bodyParagraphs);

  const newArticle: AddArticle = { title: title, body: body };

  return newArticle;
}
