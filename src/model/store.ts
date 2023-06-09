import { createStore as createZustandStore, StoreApi } from "zustand";
import { Api, createApi } from "../api";
import { Podcast } from "../@types/podcast";

type Store = {
  list: Podcast[];
  fetchPodcastList: () => void;
};

const createTypedStore = createZustandStore<Store>();

export const createStore = (api: Api): StoreApi<Store> => {
  const store = createTypedStore((set) => ({
    list: [],

    fetchPodcastList: async () => {
      const data = await api.getPodcastList();
      if (!(data instanceof Error)) {
        set({ list: data });
      }
    },
  }));

  store.getState().fetchPodcastList();

  return store;
};

const api = createApi();
export const store = createStore(api);
