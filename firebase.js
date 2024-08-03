// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8ph539zu1Jz2jwmJk8TvV2NQ5V4lrmls",
  authDomain: "account-week2.firebaseapp.com",
  projectId: "account-week2",
  storageBucket: "account-week2.appspot.com",
  messagingSenderId: "141620433578",
  appId: "1:141620433578:web:5ef2f140f4b51eb304f6d3",
  measurementId: "G-S2K5JRZBW6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
