import { createStore as createZustandStore, StoreApi } from "zustand";
import { Api, createApi } from "../api";
import { PodcastPreview } from "../@types/podcast";

type ModalStore = {
  isOpen: boolean;
  isMaximized: boolean;
  phase: "IDLE" | "LOADING" | "LOADED";
  data: {};
  openModal: () => void;
  closeModal: () => void;
  maximiseModal: () => void;
  minimiseModal: () => void;
  updateData: (data: any) => void;
};

type Store = {
  list: PodcastPreview[];
  fetchPodcastList: () => void;
  modal: ModalStore;
};

const createTypedStore = createZustandStore<Store>();

export const createStore = (api: Api): StoreApi<Store> => {
  const store = createTypedStore((set) => ({
    list: [],
    modal: {
      phase: "IDLE",
      isOpen: false,
      isMaximized: true,
      data: {},
      openModal: () =>
        set((state) => ({ modal: { ...state.modal, isOpen: true } })),
      closeModal: () =>
        set((state) => ({ modal: { ...state.modal, isOpen: false } })),
      maximiseModal: () =>
        set((state) => ({ modal: { ...state.modal, isMaximized: true } })),
      minimiseModal: () =>
        set((state) => ({ modal: { ...state.modal, isMaximized: false } })),
      updateData: (data) =>
        set((state) => ({ modal: { ...state.modal, modalData: data } })),
    },
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
