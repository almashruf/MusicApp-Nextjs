// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADVooV3A9E683oEVzd6WwNHUrjhdviYHc",
  authDomain: "endel-clone.firebaseapp.com",
  projectId: "endel-clone",
  storageBucket: "endel-clone.firebasestorage.app",
  messagingSenderId: "277119163864",
  appId: "1:277119163864:web:941514482bf80a4f64a6ad",
  measurementId: "G-CW1H158JK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only on client side
export const initializeAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const { getAnalytics } = await import('firebase/analytics');
    return getAnalytics(app);
  }
  return null;
};