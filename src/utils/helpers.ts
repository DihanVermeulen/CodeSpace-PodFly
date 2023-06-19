import { IndividualPodcast } from "../@types/podcast";
import {
  IndividualPodcast,
  IndividualPodcastEpisode,
  IndividualPodcastSeason,
} from "../@types/podcast";
import { createApi } from "../api";
import { supabase } from "../services/supabase";
const api = createApi();

/**
 * Fetches an individual podcast
 * @param id - id of podcast
 * @returns {Promise<IndividualPodcast | Error >}
 */
export const fetchIndividualPodcast = (
  id: string
): Promise<IndividualPodcast | Error> => {
  return new Promise((resolve, reject) => {
    try {
      const data = api.getIndividualPodcastList(id);
      if (!(data instanceof Error)) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Fetches all individual podcasts by the show ids passed in as arguments
 * @param idArray id of the show
 */
export const fetchAllIndividualPodcasts = async (idArray: string[]) => {
  const podcastArray: IndividualPodcast[] = [];
  for (const id of idArray) {
    try {
      const podcast: IndividualPodcast | Error = await fetchIndividualPodcast(
        id
      );
      if (!(podcast instanceof Error)) podcastArray.push(podcast);
    } catch (error) {
      console.error(`Error fetching individual podcast with id ${id}:`, error);
    }
  }
  return podcastArray;
};

/**
 * Filters the fetched individual podcasts based on the associated episodes and seasons from the favorites table
 * @param allPodcasts array of all individual podcasts
 * @param fetchedRows fetched rows from favorites table
 * @returns filtered array of favorite individual podcasts
 */
export const createFavouritesArray = (
  allPodcasts: IndividualPodcast[],
  fetchedRows: any[]
) => {
  const filteredPodcasts: IndividualPodcast[] = [];

  for (const podcast of allPodcasts) {
    const filteredSeasons: IndividualPodcastSeason[] = [];

    for (const season of podcast.seasons) {
      const filteredEpisodes: IndividualPodcastEpisode[] = [];

      for (const episode of season.episodes) {
        if (
          fetchedRows.some(
            (row) =>
              row.show_id === podcast.id &&
              row.season === season.season &&
              row.episode === episode.episode
          )
        ) {
          filteredEpisodes.push(episode);
        }
      }

      if (filteredEpisodes.length > 0) {
        filteredSeasons.push({ ...season, episodes: filteredEpisodes });
      }
    }

    if (filteredSeasons.length > 0) {
      filteredPodcasts.push({ ...podcast, seasons: filteredSeasons });
    }
  }
  return filteredPodcasts;
};
/**
 * Fetches favourite shows info from the Supabase database
 * @param userId
 */
export const fetchFavouritesInfoFromDatabase = async (userID: string) => {
  const { data, error } = await supabase
    .from("favourites")
    .select("*")
    .eq("user_id", userID);

  if (!error) return data;
  return error;
};

export type AddEpisodeToFavourites = {
  userID: string;
  episodeNumber: number;
  seasonNumber: number;
  showID: string;
};

export const addEpisodeToFavourites = async (props: AddEpisodeToFavourites) => {
  const { userID, episodeNumber, seasonNumber, showID } = props;
  const { data, error } = await supabase.from("favourites").insert([
    {
      user_id: userID,
      episode: episodeNumber,
      season: seasonNumber,
      show_id: showID,
    },
  ]);


  if (error) {
    console.error("Error fetching user data:", error);
  } else {
    console.log("Fetched user data:", data);
  }
};

export default {
  fetchIndividualPodcast,
  fetchFavouritesInfoFromDatabase,
  addEpisodeToFavourites,
  fetchAllIndividualPodcasts,
};
