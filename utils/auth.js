import { firebaseAuth } from './firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const createUser = async (email, password) => {
  const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);

  return response;
};

export const signIn = async (email, password) => {
  const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return response;
};
