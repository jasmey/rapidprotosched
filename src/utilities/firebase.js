// Import the functions you need from the SDKs you need
import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  connectDatabaseEmulator,
  getDatabase,
  onValue,
  ref,
  update,
} from "firebase/database";
import {
  connectAuthEmulator,
  signInWithCredential,
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
  apiKey: "AIzaSyCVaZygY5FMyqi2A_tv_9y5FwQco701cOQ",
  authDomain: "jazzy-react-toot.firebaseapp.com",
  databaseURL: "https://jazzy-react-toot-default-rtdb.firebaseio.com",
  projectId: "jazzy-react-toot",
  storageBucket: "jazzy-react-toot.appspot.com",
  messagingSenderId: "738485037785",
  appId: "1:738485037785:web:3090491aa78626a60f2cc8",
  measurementId: "G-QTDZQWNQQX",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);

if (!globalThis.EMULATION && import.meta.env.MODE === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectDatabaseEmulator(database, "localhost", 9000);

  signInWithCredential(
    auth,
    GoogleAuthProvider.credential(
      '{"sub": "1Lw6KtDrzHZ0LTnMsbcuWk8Ku2PO", "email": "harrypotter@gmail.com", "displayName":"Harry", "email_verified": true}'
    )
  );

  // set flag to avoid connecting twice, e.g., because of an editor hot-reload
  globalThis.EMULATION = true;
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          console.log("Data updated:", snapshot.val());
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
