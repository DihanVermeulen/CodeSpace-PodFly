import { useStore } from "zustand";
import { store } from "./store";

export const getModalState = () => {
  return {
    isOpen: useStore(store, (state) => state.modal.isOpen),
    isMaximised: useStore(store, (state) => state.modal.isMaximized),
  };
};

export default { getModalState };
