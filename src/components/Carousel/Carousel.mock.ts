import { faker } from "@faker-js/faker";
import { PodcastPreview } from "../../@types/podcast";

export const mocks = {
  basic: (): PodcastPreview => ({
    id: Math.floor(Math.random() * 1000 + 1),
    image: faker.image.urlPicsumPhotos(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    genres: [faker.lorem.word()],
  }),
};
