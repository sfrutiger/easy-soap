// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_DEVELOPMENT_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DEVELOPMENT_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_DEVELOPMENT_STORAGEBUCKET,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_DEVELOPMENT_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
