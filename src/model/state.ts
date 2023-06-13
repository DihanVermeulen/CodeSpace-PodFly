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
 * @returns state
 */
export const getAppState = () => {
  return {
    list: useStore(store, (state) => state.list),
  };
};

export default { getModalState, getAppState };
