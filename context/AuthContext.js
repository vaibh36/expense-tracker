import React, { createContext, useReducer } from 'react';

const userStatus = {
  isAuthenticated: false,
  userDetails: {},
};
export const AuthContext = createContext({
  saveUserDetails: () => {},
  isAuthenticated: false,
  userDetails: {},
  signOut: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
    case 'SIGN_IN_USER':
      return {
        ...state,
        isAuthenticated: true,
        userDetails: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        userDetails: {},
      };
    default:
      return state;
  }
}

function AuthContextProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, userStatus);

  function saveUserDetails(user) {
    dispatch({ type: 'CREATE_USER', payload: user });
  }

  function signInUser(user) {
    dispatch({ type: 'SIGN_IN_USER', payload: user });
  }

  function signOut() {
    dispatch({ type: 'SIGN_OUT' });
  }

  const value = {
    userDetails: authState?.userDetails,
    isAuthenticated: authState?.isAuthenticated,
    saveUserDetails: saveUserDetails,
    signInUser: signInUser,
    signOut: signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
