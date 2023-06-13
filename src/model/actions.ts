import { useStore } from "zustand";
import { store } from "./store";

export const createModalActions = () => {
  return {
    updateModalData: useStore(store, (state) => state.modal.data),
    openModal: useStore(store, (state) => state.modal.openModal),
    closeModal: useStore(store, (state) => state.modal.closeModal),
    maximiseModal: useStore(store, (state) => state.modal.maximiseModal),
    minimiseModal: useStore(store, (state) => state.modal.minimiseModal),
  };
};

export default { createModalActions };
