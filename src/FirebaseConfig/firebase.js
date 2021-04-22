import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBpFit--I6w-5HdiiHurU5qMy9KQgDR8PM",
  authDomain: "fir-dummyproject-f6a02.firebaseapp.com",
  databaseURL: "https://fir-dummyproject-f6a02.firebaseio.com",
  projectId: "fir-dummyproject-f6a02",
  storageBucket: "fir-dummyproject-f6a02.appspot.com",
  messagingSenderId: "659673299074",
  appId: "1:659673299074:web:30bad08e9d57d59a389c9b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const database = firebase.database();
const functions = firebase.functions();
const addMessages = firebase.messaging;

export {
  auth,
  provider,
  firebaseApp,
  storage,
  database,
  functions,
  addMessages,
};
export default db;
