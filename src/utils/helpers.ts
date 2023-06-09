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
 * @param fetchedRows fetched rows from favouurites table
 * @returns filtered array of favourite individual podcasts
 */
export const createFavouritesArray = (
  allPodcasts: IndividualPodcast[],
  fetchedRows: any[]
) => {
  const favouritesArray: IndividualPodcast[] = [];
  for (const row of fetchedRows) {
    const { episode, season, show_id, id, created_at, updated_at } = row;
    // Find the matching podcast based on the show_id
    const podcast = allPodcasts.find((p) => p.id === show_id);
    if (podcast) {
      // Check if the podcast already exists in the favourites array
      const existingPodcast = favouritesArray.find((p) => p.id === podcast.id);
      if (existingPodcast) {
        // Find the matched season in the existing podcast
        const existingSeason = existingPodcast.seasons.find(
          (s) => s.season === season
        );
        if (existingSeason) {
          // Check if the episode already exists in the existing season
          const existingEpisode = existingSeason.episodes.find(
            (e) => e.episode === episode
          );
          if (!existingEpisode) {
            // Find the matched episode in the original podcast
            const matchedEpisode = podcast.seasons
              .find((s) => s.season === season)
              ?.episodes.find((e) => e.episode === episode);
            if (matchedEpisode) {
              // Add the matched episode to the existing season
              existingSeason.episodes.push({
                ...matchedEpisode,
                id,
                created_at,
                updated_at,
              });
            }
          }
        } else {
          // Create a new season with the matched episode
          const matchedSeason = podcast.seasons.find(
            (s) => s.season === season
          );
          if (matchedSeason) {
            const matchedEpisode = matchedSeason.episodes.find(
              (e) => e.episode === episode
            );
            if (matchedEpisode) {
              existingPodcast.seasons.push({
                ...matchedSeason,
                episodes: [{ ...matchedEpisode, id, created_at, updated_at }],
              });
            }
          }
        }
      } else {
        // Create a new podcast object with the matched season and episode
        const newPodcast: IndividualPodcast = {
          ...podcast,
          seasons: [],
        };
        // Find the matched season
        const matchedSeason = podcast.seasons.find((s) => s.season === season);
        if (matchedSeason) {
          const matchedEpisode = matchedSeason.episodes.find(
            (e) => e.episode === episode
          );
          if (matchedEpisode) {
            newPodcast.seasons.push({
              ...matchedSeason,
              episodes: [{ ...matchedEpisode, id, created_at, updated_at }],
            });
          }
        }
        // Add the new podcast to the favourites array
        favouritesArray.push(newPodcast);
      }
    }
  }
  return favouritesArray;
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

  if (!error) {
    return data;
  }
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
  const { userID, episodeNumber, seasonNumber, showID } = props;
  return new Promise(async (resolve, reject) => {
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
      reject(error);
    } catch (error) {
      reject(error);
    }
  });
};

type RemoveEpisodeFromFavourites = {
  episodeID: string;
};

export const removeEpisodeFromFavourites = (
  props: RemoveEpisodeFromFavourites
) => {
  const { episodeID } = props;
  return new Promise(async (resolve, reject) => {
    try {
      const { error, data } = await supabase
        .from("favourites")
        .delete()
        .eq("id", episodeID);

      if (!error) {
        resolve(data);
      }
      reject(error);
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * Formats time in seconds and return string in the format mm:ss
 * @param timeInSeconds
 * @returns formatted time
 */
export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const findEpisode = (
  data: IndividualPodcast,
  seasonNumber: number,
  episodeNumber: number
) => {
  const season: IndividualPodcastSeason | undefined = data.seasons.find(
    (item) => item.season === seasonNumber
  );

  const episode: IndividualPodcastEpisode | undefined = season?.episodes.find(
    (item) => item.episode === episodeNumber
  );
  if (typeof episode !== "undefined") {
    return {
      episode,
    };
  }
};

/**
 * Copies item to clipboard
 * @param data eny piece of data to copy to clipboard
 */
export const copyToClipboard = (data: any) => {
  navigator.clipboard
    .writeText(data)
    .then(() => {
      console.log("Copied to clipboard:", data);
    })
    .catch((error) => {
      console.error("Failed to copy to clipboard:", error);
    });
};

export const shareContent = async (
  title: string,
  text: string,
  URL: string
) => {
  if (navigator.share) {
    const shareData = {
      title: title,
      text: text,
      url: URL,
    };

    await navigator.share(shareData);
  } else {
    copyToClipboard(URL);
  }
};

export default {
  fetchIndividualPodcast,
  fetchFavouritesInfoFromDatabase,
  addEpisodeToFavourites,
  fetchAllIndividualPodcasts,
  removeEpisodeFromFavourites,
  formatTime,
  copyToClipboard,
};
