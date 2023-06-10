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
};

type IndividualPodcastEpisode = {
  title: string;
  description: string;
  episode: number;
  file: string;
};

type IndividualPodcastSeason = {
  season: number;
  title: string;
  image: string;
  episodes: IndividualPodcastEpisode[];
};

type IndividualPodcast = {
  id: string;
  title: string;
  seasons: IndividualPodcastSeason[];
};
