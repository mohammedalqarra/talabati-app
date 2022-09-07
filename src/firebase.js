import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyAhlQDm-rOhbCnA-JiOeLNCFtwbffWZ1ZY",
  authDomain: "talbati-app.firebaseapp.com",
  projectId: "talbati-app",
  storageBucket: "talbati-app.appspot.com",
  messagingSenderId: "850331880983",
  appId: "1:850331880983:web:64bb5e154d433a0a8c1652",
  measurementId: "G-FNG6FRX4Q0"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export const GOOGLE_MAP_WEB_KEY = firebaseConfig.apiKey

export { firebase };
