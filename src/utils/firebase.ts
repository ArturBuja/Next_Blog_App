// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'fltlblog.firebaseapp.com',
  projectId: 'fltlblog',
  storageBucket: 'fltlblog.appspot.com',
  messagingSenderId: '327861926831',
  appId: '1:327861926831:web:a1739bb52d1e5df73e0d5a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
