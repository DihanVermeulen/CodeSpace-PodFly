import { faker } from "@faker-js/faker";
import { Podcast } from "../../@types/podcast";

export const mocks = {
  basic: (): Podcast => ({
    id: Math.floor(Math.random() * 1000 + 1),
    image: faker.image.urlPicsumPhotos(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    genres: [faker.lorem.word()],
  }),
};
