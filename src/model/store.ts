import { createStore as createZustandStore, StoreApi } from "zustand";
import { Api, createApi } from "../api";
import { PodcastPreview } from "../@types/podcast";
import { supabase } from "../services/supabase";
import { User } from "@supabase/supabase-js";

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
  user: User | null;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => Promise<void>;
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
      user: null,
      signUp: async (email: string, password: string) => {
        try {
          const {
            data: { user },
            error,
          } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) throw error;
          set((state) => ({
            auth: { ...state.auth, user: user },
          }));
        } catch (error) {
          console.error("Sign-up error:", error.message);
        }
      },
      signIn: async (email: string, password: string) => {
        try {
          const {
            data: { user },
            error,
          } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          set((state) => ({ auth: { ...state.auth, user: user } }));
        } catch (error) {
          console.error("Sign-in error:", error.message);
        }
      },
      signOut: async () => {
        try {
          await supabase.auth.signOut();
          set((state) => ({ auth: { ...state.auth, user: null } }));
        } catch (error) {
          console.error("Sign-out error:", error.message);
        }
      },
    },
  }));

  store.getState().fetchPodcastList();

  return store;
};

const api = createApi();
export const store = createStore(api);
