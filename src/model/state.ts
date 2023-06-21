import { useStore } from "zustand";
import { store } from "./store";

/**
 * Gets Player component state
 * @returns state
 */
export const getModalState = () => {
  return {
    isOpen: useStore(store, (state) => state.modal.isOpen),
    isMaximised: useStore(store, (state) => state.modal.isMaximized),
    phase: useStore(store, (state) => state.modal.phase),
    data: useStore(store, (state) => state.modal.data),
  };
};

/**
 * Gets the app's state
 * @returns App state
 */
export const getAppState = () => {
  return {
    list: useStore(store, (state) => state.list),
  };
};

/**
 * Gets the Auth state
 * @returns Auth state
 */
export const getAuthState = () => {
  return {
    session: useStore(store, (state) => state.auth.session),
  };
};

/**
 * Gets the user favourites state
 * @returns favourites state
 */
export const getFavouritesState = () => {
  return {
    favouritesList: useStore(store, (state) => state.favourites.favouritesList),
  };
};

export default { getModalState, getAppState, getAuthState, getFavouritesState };
