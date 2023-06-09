type PodcastPreview = {
  id: string;
  title: string;
  image: string;
  description: string;
  seasons: number;
  genres: number[];
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
  id?: string;
  created_at?: string;
  updated_at?: string;
};

type IndividualPodcastSeason = {
  season: number;
  title: string;
  image: string;
  genres: string[];
  episodes: IndividualPodcastEpisode[];
};

type IndividualPodcast = {
  id: string;
  title: string;
  image: string;
  updated: Date;
  seasons: IndividualPodcastSeason[];
};
