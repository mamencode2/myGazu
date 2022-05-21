

  


// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPb3wleGcpNjc9OxTR0k2jQSX4UYROu3c",
  authDomain: "gazu-874da.firebaseapp.com",
  projectId: "gazu-874da",
  storageBucket: "gazu-874da.appspot.com",
  messagingSenderId: "206218084253",
  appId: "1:206218084253:web:a51ac12c93ab49b10f7974",
  measurementId: "G-88T2S8MJRZ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
export { app, auth, db, storage };