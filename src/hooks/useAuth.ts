import { createAuthActions, getAuthState } from "../model";

export const useAuth = () => {
  const authActions = createAuthActions();
  const authState = getAuthState();

  return {
    signIn: authActions.signIn,
    signOut: authActions.signOut,
    signUp: authActions.signUp,
    getSession: () => authState.session,
  };
};

export default useAuth;
