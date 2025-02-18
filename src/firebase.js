// src/firebase.js
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGiCzC6N6X62cRpJiyliTMRQ6VpT4ViZo",
  authDomain: "my-blog-bdc1f.firebaseapp.com",
  projectId: "my-blog-bdc1f",
  storageBucket: "my-blog-bdc1f.firebasestorage.app",
  messagingSenderId: "1061703997990",
  appId: "1:1061703997990:web:b0c7a7d61bb560d052a4e7",
};

// Initialize Firebase
// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
