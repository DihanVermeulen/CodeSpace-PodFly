import { Podcast, PodcastResponse } from "../@types/podcast";

export type Api = {
  getPodcastList: () => Promise<Error | Podcast[]>;
};

const URL = "https://podcast-api.netlify.app";

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

export const createApi = (): Api => {
  return {
    getPodcastList,
  };
};
