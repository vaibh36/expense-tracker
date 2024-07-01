import axios from 'axios';

export const createUser = async (email, password) => {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCenlwbHqcsnn24e_DC1hdx8n2ouUD1K5E',
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  return response;
};

export const signIn = async (email, password) => {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCenlwbHqcsnn24e_DC1hdx8n2ouUD1K5E',
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  return response;
};
