import firebase from "firebase";
// import "firebase/auth";

const config = {
  apiKey: "AIzaSyCovIGSW0uk6LCdVBmt354J9Ry7zst0nUY",
  authDomain: "loyaltywallet-e9379.firebaseapp.com",
  databaseURL: "https://loyaltywallet-e9379.firebaseio.com",
  projectId: "loyaltywallet-e9379",
  storageBucket: "loyaltywallet-e9379.appspot.com",
  messagingSenderId: "774095261078",
  appId: "1:774095261078:web:ee7131df3bfd31efd461b7",
  measurementId: "G-F37FSHEPQX",
};

const FirebaseConfig = firebase.initializeApp(config);

export const auth = FirebaseConfig.auth();
export const db = FirebaseConfig.database();

export default FirebaseConfig;
