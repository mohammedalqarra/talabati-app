import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8nrzCplZrOUrABseqk8yreGOLbUdVljY",
  authDomain: "talabati-72c71.firebaseapp.com",
  projectId: "talabati-72c71",
  storageBucket: "talabati-72c71.appspot.com",
  messagingSenderId: "748532839211",
  appId: "1:748532839211:web:e39846421d185646e34b6e",
};

initializeApp(firebaseConfig);
export const database = getFirestore();
