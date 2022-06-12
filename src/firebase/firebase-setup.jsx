import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "hydra-hacks.firebaseapp.com",
  projectId: "hydra-hacks",
  storageBucket: "hydra-hacks.appspot.com",
  messagingSenderId: "202084530836",
  appId: "1:202084530836:web:02e20dbfacadf87acf1281",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
