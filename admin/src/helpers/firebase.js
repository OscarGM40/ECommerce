
import firebase from "firebase/app";
import 'firebase/storage';
// podria desesctructurar firebase perfectamente
// import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcs-YCqXQ2fHmZVe-6Qjsw9pVgXh-lKGU",
  authDomain: "eccomercemern.firebaseapp.com",
  projectId: "eccomercemern",
  storageBucket: "eccomercemern.appspot.com",
  messagingSenderId: "1016574659993",
  appId: "1:1016574659993:web:9d79d4c1ebd97eb72c5708"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export default storage;
