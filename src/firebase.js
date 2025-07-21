// ✅ src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrti6ihzMVTdXB0CyCX1unAX3ukZR9dSE",
  authDomain: "fork-and-search.firebaseapp.com",
  projectId: "fork-and-search",
  storageBucket: "fork-and-search.appspot.com", // 🔥 Fix: storageBucket should end with .app**spot**.com
  messagingSenderId: "448317667321",
  appId: "1:448317667321:web:880bde420c3d5628a62f28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
