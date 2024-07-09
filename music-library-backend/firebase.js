// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpDblEx_ivuI9eFis-N5KSFL_TRY1AL64",
  authDomain: "music-library-fa154.firebaseapp.com",
  projectId: "music-library-fa154",
  storageBucket: "music-library-fa154.appspot.com",
  messagingSenderId: "35550945518",
  appId: "1:35550945518:web:348f045f645661fb70d3ff",
  measurementId: "G-FQWK3YX2KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = db;