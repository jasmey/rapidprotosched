// Import the functions you need from the SDKs you need
import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, update } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUkllv55DaawlAk6_LyqDl7pnYdMR8-Ag",
  authDomain: "cs-392-schedule-app.firebaseapp.com",
  projectId: "cs-392-schedule-app",
  storageBucket: "cs-392-schedule-app.appspot.com",
  messagingSenderId: "889726512355",
  appId: "1:889726512355:web:02126a56a37fe3aa7b29d6",
  measurementId: "G-HPT8ETBCGW",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

//Functions to sign in and out with Google
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};
