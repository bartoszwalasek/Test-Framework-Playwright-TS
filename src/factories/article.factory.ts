import { AddArticle } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function createRandomArticle(): AddArticle {
  const addArticle: AddArticle = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(10),
  };

  return addArticle;
}
