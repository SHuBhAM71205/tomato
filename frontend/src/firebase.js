// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "tomato-cd0f9.firebaseapp.com",
  projectId: "tomato-cd0f9",
  storageBucket: "tomato-cd0f9.firebasestorage.app",
  messagingSenderId: "261852007154",
  appId: "1:261852007154:web:d9cd92bed69790f5d5de6b",
  measurementId: "G-LK80F9HNRE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth, app };