import { createStore as createZustandStore, StoreApi } from "zustand";
import { Api, createApi } from "../api";
import { PodcastPreview } from "../@types/podcast";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";

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

type AuthStore = {
  session: Session | null;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  fetchSession: () => void;
};

type Store = {
  list: PodcastPreview[];
  fetchPodcastList: () => void;
  modal: ModalStore;
  auth: AuthStore;
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
              console.log("session: ", session);
              set((state) => ({ auth: { ...state.auth, session } }));
            }
          });
      },
    },
  }));

  store.getState().fetchPodcastList();
  store.getState().auth.fetchSession();

  return store;
};

const api = createApi();
export const store = createStore(api);
