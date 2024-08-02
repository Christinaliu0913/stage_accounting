// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYPFBChZINTwvC0JZ9h6RARcLLkBaHiUY",
  authDomain: "wedo-d6284.firebaseapp.com",
  projectId: "wedo-d6284",
  storageBucket: "wedo-d6284.appspot.com",
  messagingSenderId: "671306263884",
  appId: "1:671306263884:web:801cc98d5f42561fba33e9",
  measurementId: "G-T9KR6MED2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};