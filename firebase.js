// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC63_O--Vxyy4q9SMbXXWimdTvvn0NBU_4",
  authDomain: "wehelp-stage3.firebaseapp.com",
  projectId: "wehelp-stage3",
  storageBucket: "wehelp-stage3.appspot.com",
  messagingSenderId: "203766807433",
  appId: "1:203766807433:web:c5ffad4c8c28953d4f7f58"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
