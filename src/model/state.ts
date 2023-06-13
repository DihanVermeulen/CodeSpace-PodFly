import { useStore } from "zustand";
import { store } from "./store";

export const getModalState = () => {
  return {
    isOpen: useStore(store, (state) => state.modal.isOpen),
    isMaximised: useStore(store, (state) => state.modal.isMaximized),
    phase: useStore(store, (state) => state.modal.phase),
    data: useStore(store, (state) => state.modal.data),
  };
};

export default { getModalState };
