// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDib0Xr58Y5cKiEJwX_QxF_qsnb61neCUc",
  authDomain: "ai-travel-planner-f223c.firebaseapp.com",
  projectId: "ai-travel-planner-f223c",
  storageBucket: "ai-travel-planner-f223c.firebasestorage.app",
  messagingSenderId: "401088680394",
  appId: "1:401088680394:web:d5cb9cd86e8b81970a7f33",
  measurementId: "G-3GWYKXL8JX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);