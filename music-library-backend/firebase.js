const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// Firebase configuration
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
