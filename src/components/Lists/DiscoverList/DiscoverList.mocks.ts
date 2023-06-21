import { faker } from "@faker-js/faker";

export const mocks = {
  basic: () => ({
    id: Math.floor(Math.random() * 1000 + 1),
    image: faker.image.urlPicsumPhotos(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    genres: [faker.lorem.word()],
  }),
};
