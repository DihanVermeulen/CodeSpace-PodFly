import { useStore } from "zustand";
import { store } from "./store";

/**
 * Action creator for Player component
 * @returns actions
 */
export const createModalActions = () => {
  return {
    updateModalData: useStore(store, (state) => state.modal.updateData),
    openModal: useStore(store, (state) => state.modal.openModal),
    closeModal: useStore(store, (state) => state.modal.closeModal),
    maximiseModal: useStore(store, (state) => state.modal.maximiseModal),
    minimiseModal: useStore(store, (state) => state.modal.minimiseModal),
  };
};

export const createAuthActions = () => {
  return {
    signIn: useStore(store, (state) => state.auth.signIn),
    signUp: useStore(store, (state) => state.auth.signUp),
    signOut: useStore(store, (state) => state.auth.signOut),
  };
};

export default { createModalActions, createAuthActions };
