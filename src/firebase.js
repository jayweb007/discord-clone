import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1PHQv-PdVblrqghnhwvy3w-dnZ4Erp8E",
  authDomain: "discord-clone-aff53.firebaseapp.com",
  projectId: "discord-clone-aff53",
  storageBucket: "discord-clone-aff53.appspot.com",
  messagingSenderId: "687932744028",
  appId: "1:687932744028:web:aa4de74a5b413f4e1b6199",
  measurementId: "G-46F12VJFRC",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
