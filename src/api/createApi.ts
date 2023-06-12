import {
  IndividualPodcast,
  PodcastPreview,
  PodcastResponse,
} from "../@types/podcast";

export type Api = {
  getPodcastList: () => Promise<Error | PodcastPreview[]>;
  getIndividualPodcastList: (id: string) => Promise<Error | IndividualPodcast>;
};

const URL = "https://podcast-api.netlify.app";
const INDIVIDUAL_PODCAST_URL = "https://podcast-api.netlify.app/id";

const getPodcastList: Api["getPodcastList"] = () => {
  const result = fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong. Try again later.");
      }
      return response;
    })
    .then((response) => response.json())
    .then((data: PodcastResponse[]) => {
      const result = data.map((item) => ({
        ...item,
        release: new Date(item.updated),
      }));

      return result;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });

  return result;
};

const getIndividualPodcastList: Api["getIndividualPodcastList"] = (
  id: string
) => {
  const result = fetch(`${INDIVIDUAL_PODCAST_URL}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong. Try again later.");
      }
      return response;
    })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return err;
    });

  return result;
};

export const createApi = (): Api => {
  return {
    getPodcastList,
    getIndividualPodcastList,
  };
};
