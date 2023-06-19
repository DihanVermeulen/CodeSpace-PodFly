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
 * Fetches favourite shows info from the Supabase database
 * @param userId
 */
export const fetchFavouritesInfoFromDatabase = async (userId: string) => {
  const { data, error } = await supabase
    .from("favourites")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user data:", error);
  } else {
    console.log("Fetched user data:", data);
  }
};

export default { fetchIndividualPodcast, fetchFavouritesInfoFromDatabase };
