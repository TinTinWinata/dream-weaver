// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_repYE1pCF61z-9GkPRq0HAfQhM6XhBI",
  authDomain: "dream-weaver-6902a.firebaseapp.com",
  projectId: "dream-weaver-6902a",
  storageBucket: "dream-weaver-6902a.appspot.com",
  messagingSenderId: "786828824024",
  appId: "1:786828824024:web:8d6dbb763450a8ab69b6ad",
  measurementId: "G-CWZF8MHSC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage()
const analytics = getAnalytics(app);