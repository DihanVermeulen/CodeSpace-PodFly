export type Podcast = {
  id: number;
  title: string;
  image: string;
  description?: string;
  seasons?: number;
  genres: string[];
  updated?: Date;
};
