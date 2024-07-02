// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCenlwbHqcsnn24e_DC1hdx8n2ouUD1K5E',
  authDomain: 'tracker-96659.firebaseapp.com',
  projectId: 'tracker-96659',
  storageBucket: 'tracker-96659.appspot.com',
  messagingSenderId: '1028548058908',
  appId: '1:1028548058908:web:6004018180755cb1c524d9',
  measurementId: 'G-DEMWNKK66G',
};

let firebaseApp;
let firebaseAuth;
// Initialize Firebase
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);

  firebaseAuth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  firebaseApp = getApp();
  firebaseAuth = getAuth(firebaseApp);
}

const firestoreDB = getFirestore(firebaseApp);

export { firebaseApp, firebaseAuth, firestoreDB };
