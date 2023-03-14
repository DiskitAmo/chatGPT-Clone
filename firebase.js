import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMPIj0zXmmLS3DxeDK6eUbfZzN1gO9RcI",
  authDomain: "chatgpt-messanger-5a31a.firebaseapp.com",
  projectId: "chatgpt-messanger-5a31a",
  storageBucket: "chatgpt-messanger-5a31a.appspot.com",
  messagingSenderId: "299764403576",
  appId: "1:299764403576:web:ec2f67bad8533dfb454c8d",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
