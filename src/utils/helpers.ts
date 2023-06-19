import { IndividualPodcast } from "../@types/podcast";
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

  for (const row of fetchedRows) {
    const { episode, season, show_id } = row;

    // Find the matching podcast based on the show_id
    const podcast = allPodcasts.find((p) => p.id === show_id);

    if (podcast) {
      // Create a new podcast object with the matched season and episodes
      const newPodcast: IndividualPodcast = {
        ...podcast,
        seasons: [],
      };

      // Find the matched season and episodes
      const matchedSeason = podcast.seasons.find((s) => s.season === season);

      if (matchedSeason) {
        const matchedEpisodes = matchedSeason.episodes.filter(
          (e) => e.episode === episode
        );
        if (matchedEpisodes.length > 0) {
          newPodcast.seasons.push({
            ...matchedSeason,
            episodes: matchedEpisodes,
          });
        }
      }

      // Check if the new podcast has any matched seasons and episodes
      if (newPodcast.seasons.length > 0) {
        // Check if the show is already added to the favourites array
        const existingPodcast = filteredPodcasts.find(
          (p) => p.id === newPodcast.id
        );

        if (existingPodcast) {
          // Add the matched seasons to the existing podcast
          existingPodcast.seasons.push(...newPodcast.seasons);
        } else {
          // Add the new podcast to the favourites array
          filteredPodcasts.push(newPodcast);
        }
      }
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

export const addEpisodeToFavourites = (
  props: AddEpisodeToFavourites
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const { userID, episodeNumber, seasonNumber, showID } = props;
    try {
      const { error } = await supabase.from("favourites").insert([
        {
          user_id: userID,
          episode: episodeNumber,
          season: seasonNumber,
          show_id: showID,
        },
      ]);
      if (!error) resolve();
      reject();
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  fetchIndividualPodcast,
  fetchFavouritesInfoFromDatabase,
  addEpisodeToFavourites,
  fetchAllIndividualPodcasts,
};
