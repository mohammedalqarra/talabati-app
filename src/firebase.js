// import { initializeApp, getApps } from "firebase/app";
// import {
//   getFirestore,
//   connectFirestoreEmulator,
//   collection,
//   query,
//   onSnapshot,
// } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB8nrzCplZrOUrABseqk8yreGOLbUdVljY",
//   authDomain: "talabati-72c71.firebaseapp.com",
//   projectId: "talabati-72c71",
//   storageBucket: "talabati-72c71.appspot.com",
//   messagingSenderId: "748532839211",
//   appId: "1:748532839211:web:e39846421d185646e34b6e",
// };

// function initializeServices() {
//   const isConfigured = getApps().length > 0;
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const firestore = getFirestore(app);
//   return { app, firestore, isConfigured };
// }

// function connectToEmulators() {
//   if (location.hostname === "localhost") {
//     connectFirestoreEmulator(firestore, "localhost", 19006);
//   }
// }

// function getFirebase() {
//   const services = initializeServices();

//   return services;
// }
// export function streamMessages({ caseId }) {
//   const { firestore } = getFirebase();
//   const MessagesCol = collection(firestore, "messages", caseId, "messages");
//   const MessageQuery = query(MessagesCol);
//   const stream = (callback) =>
//     onSnapshot(MessageQuery, (snapshot) => {
//       const messages = snapshot.docs.map((doc) => {
//         const isDeliverd = !doc.metadata.hasPendingWrites;
//         return {
//           isDeliverd,
//           id: doc.id,
//           ...doc.data(),
//         };
//       });
//       callback(messages);
//     });
//   return { stream };
// }

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8nrzCplZrOUrABseqk8yreGOLbUdVljY",
  authDomain: "talabati-72c71.firebaseapp.com",
  projectId: "talabati-72c71",
  storageBucket: "talabati-72c71.appspot.com",
  messagingSenderId: "748532839211",
  appId: "1:748532839211:web:e39846421d185646e34b6e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
