import { createStore as createZustandStore, StoreApi } from "zustand";
import { Api, createApi } from "../api";
import { IndividualPodcast, PodcastPreview } from "../@types/podcast";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";
import {
  createFavouritesArray,
  fetchAllIndividualPodcasts,
  fetchFavouritesInfoFromDatabase,
} from "../utils/helpers";

type ModalStore = {
  isOpen: boolean;
  isMaximized: boolean;
  phase: "IDLE" | "LOADING" | "LOADED";
  data: null | PlayerData;
  openModal: () => void;
  closeModal: () => void;
  maximiseModal: () => void;
  minimiseModal: () => void;
  updateData: (data: any) => void;
};

type FavouritesStore = {
  favouritesList: IndividualPodcast[];
  getFavouritesEpisodes: () => void;
};

type AuthStore = {
  session: Session | null;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  fetchSession: () => void;
  subscribeToSessionChanges: () => void;
};

type Store = {
  list: PodcastPreview[];
  fetchPodcastList: () => void;
  modal: ModalStore;
  auth: AuthStore;
  favourites: FavouritesStore;
};

const createTypedStore = createZustandStore<Store>();

/**
 * Creates a zustand store
 * @param {Api} api  - api that is created
 * @returns {StoreApi<Store>} store
 */
export const createStore = (api: Api): StoreApi<Store> => {
  const store = createTypedStore((set) => ({
    list: [],
    modal: {
      phase: "IDLE",
      isOpen: false,
      isMaximized: false,
      data: null,
      openModal: () =>
        set((state) => ({ modal: { ...state.modal, isOpen: true } })),
      closeModal: () =>
        set((state) => ({ modal: { ...state.modal, isOpen: false } })),
      maximiseModal: () =>
        set((state) => ({ modal: { ...state.modal, isMaximized: true } })),
      minimiseModal: () =>
        set((state) => ({ modal: { ...state.modal, isMaximized: false } })),
      updateData: (data) =>
        set((state) => ({ modal: { ...state.modal, data: data } })),
    },
    fetchPodcastList: async () => {
      const data = await api.getPodcastList();
      if (!(data instanceof Error)) {
        set({ list: data });
      }
    },
    auth: {
      session: null,
      signUp: (email: string, password: string) => {
        supabase.auth
          .signUp({
            email,
            password,
          })
          .then(({ data: { session }, error }) => {
            if (!error)
              set((state) => ({
                auth: { ...state.auth, session },
              }));
          });
      },
      signIn: (email: string, password: string) => {
        supabase.auth
          .signInWithPassword({
            email,
            password,
          })
          .then(({ data: { session }, error }) => {
            if (!error) set((state) => ({ auth: { ...state.auth, session } }));
          });
      },
      signOut: async () => {
        await supabase.auth.signOut();
        set((state) => ({ auth: { ...state.auth, session: null } }));
      },
      fetchSession: async () => {
        await supabase.auth
          .getSession()
          .then(({ data: { session }, error }) => {
            if (!error) {
              set((state) => ({ auth: { ...state.auth, session } }));
              const userID = session?.user.id;
              if (userID) {
                store.getState().favourites.getFavouritesEpisodes();
              }
            }
          });
      },
      subscribeToSessionChanges: () => {
        supabase.auth.onAuthStateChange((event, session) => {
          if (event === "SIGNED_IN") {
            set((state) => ({ auth: { ...state.auth, session } }));
            const userID = session?.user.id;
            if (typeof userID !== "undefined") {
              store.getState().favourites.getFavouritesEpisodes();
            }
          } else if (event === "SIGNED_OUT") {
            set((state) => ({ auth: { ...state.auth, session: null } }));
          }
        });
      },
    },
    favourites: {
      favouritesList: [],
      getFavouritesEpisodes: async () => {
        const userID = store.getState().auth.session?.user.id;
        if (!userID) throw new Error("User id is expected but none was found");
        const favourites: any = await fetchFavouritesInfoFromDatabase(userID);
        const favouriteIDs = favourites.map(
          (row: { show_id: any }) => row.show_id
        );
        const allIndividualPodcasts = await fetchAllIndividualPodcasts(
          favouriteIDs
        );
        if (favourites && allIndividualPodcasts) {
          const filteredFavourites = createFavouritesArray(
            allIndividualPodcasts,
            favourites as any
          ).map((item) => ({ ...item, updated: new Date(item.updated) }));
          set((state) => ({
            favourites: {
              ...state.favourites,
              favouritesList: filteredFavourites,
            },
          }));
        }
      },
    },
  }));

  store.getState().fetchPodcastList();
  store.getState().auth.fetchSession();
  store.getState().auth.subscribeToSessionChanges();

  return store;
};

const api = createApi();
export const store = createStore(api);
