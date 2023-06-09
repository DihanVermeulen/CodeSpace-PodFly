export type Podcast = {
  id: number;
  title: string;
  image: string;
  description: string;
  seasons: number;
  genres: string[];
  updated: Date;
};

export type PodcastResponse = {
  id: string;
  title: string;
  image: string;
  description: string;
  seasons: number;
  genres: number[];
  updated: string;

}