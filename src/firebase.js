// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHYwXV8nH9c9baNxcdfXUHqTmKb3aDZVU",
  authDomain: "recetario-laura.firebaseapp.com",
  projectId: "recetario-laura",
  storageBucket: "recetario-laura.firebasestorage.app",
  messagingSenderId: "1081178935275",
  appId: "1:1081178935275:web:4ecc22d034ac67dbf513ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)